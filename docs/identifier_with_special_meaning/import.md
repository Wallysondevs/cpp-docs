# Identificador C++ com significado especial: import (desde C++20)

### Uso

  * [`module` _declaração de importação_](<#/doc/language/modules>): importa um conjunto de unidades de tradução

### Exemplo
```cpp
    export module foo;
     
    import bar;   // imports all module interface units of module bar
    import :baz;  // imports the so-named module partition baz of module foo
    import <set>; // imports a synthesized header unit formed from header <set>
```

### Veja também

  * [`export`](<#/doc/keyword/export>), [`module`](<#/doc/identifier_with_special_meaning/module>)
