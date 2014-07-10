<?php

new manifest('src');

class manifest {

  private $var = '(?:[\w\$][\d\w\$]*)';

	function __construct($file_root) {

		$data = array();

		foreach (scandir($file_root) as $file_name) {

			if (in_array($file_name, array('.', '..', 'externs.js'))) {
				continue;
			}
      
      $data[] = $this->get_dependencies($file_root, $file_name);
      
    }
    
    $this->resolve_dependencies($data);
    
    $file_paths = array();

    for($i = 0; isset($data[$i]); ++$i) {
      $file_paths[] = $data[$i]['file_path'];
    }

    file_put_contents('build/manifest_lines', implode("\n", $file_paths));
    file_put_contents('build/manifest_spaces', implode(" ", $file_paths));

	}
  
  private function get_dependencies($file_root, $file_name) {

    $contents = file_get_contents($file_root . DIRECTORY_SEPARATOR . $file_name);

    $contents = preg_replace('/\/\*\*.+?\*\//s', '', $contents);

    $dep = array(
      'file_path' => $file_root . DIRECTORY_SEPARATOR . $file_name,
      'provides' => array(),
      'requires' => array(),
    );

    preg_match_all('/^(?:var )?('.$this->var.'(?:\.'.$this->var.')*)\s+=/m', $contents, $matches);

    foreach ($matches[1] as $match) {

      $dep['provides'][$match] = true;

      $match = explode('.', $match);
      while(count($match)) {
        array_pop($match);
        if (end($match) === 'prototype') {
          array_pop($match);
        }
        $req = implode('.', $match);
        if ($req) {
          $dep['requires'][$req] = true;
        }
      }
    }

    foreach ($dep['requires'] as $req => $foo) {
      if (isset($dep['provides'][$req])) {
        unset($dep['requires'][$req]);
      }
    }

    preg_match_all('/^('.$this->var.'(\.'.$this->var.')*)\(\s*(.+?)\s*\);/sm', $contents, $matches);


    foreach ($matches[1] as $match) {
      $dep['requires'][$match] = true;
    }

    foreach ($matches[3] as $match) {
      foreach (preg_split('/\s*,\s*/', $match) as $req) {
        $dep['requires'][$req] = true;
      }
    }
    
    preg_match_all('/^('.$this->var.'(\.'.$this->var.')*)\s*=\s*\'[^\']+\'\s*\+\s*('.$this->var.'(\.'.$this->var.')*);/sm', $contents, $matches);
    
    foreach ($matches[3] as $match) {
      $dep['requires'][$match] = true;
    }
    
    return $dep;
    
  }

  private function resolve_dependencies(&$data){
    for($i = 0; isset($data[$i]); ++$i) {
      foreach ($data[$i]['requires'] as $req => $foo) {
        for($j = 0; isset($data[$j]); ++$j) {
          foreach ($data[$j]['provides'] as $prov => $foo) {
            if ($req === $prov) {
              if ($i < $j) {
                array_splice($data, $j, 0, array_splice($data, $i, 1));
                --$i;
                continue(4);
              }
            }
          }
        }
      }
    }
  }
  
}

