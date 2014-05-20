<?php

new deps('src');

class deps {

	private $data;

	function __construct($file_root) {

		$this->data = array();

    $var = '(?:[\w\$][\d\w\$]*)';
    
		foreach (scandir($file_root) as $file_name) {

			if (in_array($file_name, array('.', '..', 'externs.js'))) {
				continue;
			}
      
      $contents = file_get_contents($file_root . '/' . $file_name);
     
      $contents = preg_replace('/\/\*\*.+?\*\//s', '', $contents);
     
      $dep = array(
        'file_path' => $file_root . '/' . $file_name,
        'provides' => array(),
        'requires' => array(),
      );
     
      preg_match_all('/^(?:var )?('.$var.'(?:\.'.$var.')*)\s+=/m', $contents, $matches);
      
      foreach($matches[1] as $match){
      
        $dep['provides'][$match] = true;
        
        $match = explode('.', $match);
        while(count($match)){
          array_pop($match);
          if(end($match) === 'prototype'){
            array_pop($match);
          }
          $req = implode('.', $match);
          if($req){
            $dep['requires'][$req] = true;
          }
        }
      }
      
      foreach($dep['requires'] as $req => $foo){
        if(isset($dep['provides'][$req])){
          unset($dep['requires'][$req]);
        }
      }
     
      $this->data[] = $dep;
      
    }
    
    for($i = 0; isset($this->data[$i]); ++$i) {
      foreach($this->data[$i]['requires'] as $req => $foo){
        for($j = 0; isset($this->data[$j]); ++$j) {
          foreach($this->data[$j]['provides'] as $prov => $foo){
            if($req === $prov){
              if($i < $j){
                array_splice($this->data, $j, 0, array_splice($this->data, $i, 1));
                --$i;
                continue(4);
              }
            }
          }
        }
      }
    }
    
    $file_paths = array();
    
    for($i = 0; isset($this->data[$i]); ++$i) {
      $file_paths[] = $this->data[$i]['file_path'];
    }
    
    file_put_contents('build/deps', implode("\n", $file_paths));
   
	}

}

