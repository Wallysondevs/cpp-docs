# Identificador C++ com significado especial: module (desde C++20)

### Uso

  * [`module` declaration](<#/doc/language/modules>): declara que a unidade de tradução atual é uma _unidade de módulo_
  * Inicia um _[fragmento de módulo global](<#/doc/language/modules>)_ de uma unidade de módulo
  * Inicia um _[fragmento de módulo privado](<#/doc/language/modules>)_ de uma unidade de módulo

### Exemplo
```cpp
    module;            // inicia um fragmento de módulo global
     
    #include <string>
     
    export module foo; // encerra um fragmento de módulo global
                       // declara a unidade de interface de módulo primária para o módulo nomeado 'foo'
                       // inicia o escopo da unidade de módulo
     
    export std::string f();
     
    module : private;  // encerra a porção da unidade de interface de módulo que
                       // pode afetar o comportamento de outras unidades de tradução
                       // inicia um fragmento de módulo privado
     
    std::string f()
    {
        return "foo";
    }
```

### Veja também

  * [`import`](<#/doc/identifier_with_special_meaning/import>), [`export`](<#/doc/keyword/export>)
  * [`private`](<#/doc/keyword/private>)
