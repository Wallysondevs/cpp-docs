# std::enable_shared_from_this&lt;T&gt;::shared_from_this

```cpp
std::shared_ptr<T> shared_from_this();  // (1) (desde C++11)
std::shared_ptr<T const> shared_from_this() const;  // (2) (desde C++11)
```

Retorna um [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt; que compartilha a propriedade de *this com todos os [std::shared_ptr](<#/doc/memory/shared_ptr>) existentes que se referem a *this.

### Valor de retorno

[std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;(`_[weak_this](<#/doc/memory/enable_shared_from_this>)_` ﻿)

### Exceções

Se `shared_from_this` for chamado em um objeto que não foi previamente compartilhado por [std::shared_ptr](<#/doc/memory/shared_ptr>), [std::bad_weak_ptr](<#/doc/memory/bad_weak_ptr>) é lançada pelo construtor de [std::shared_ptr](<#/doc/memory/shared_ptr>).

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
     
    struct Foo : public std::enable_shared_from_this<Foo>
    {
        Foo() { std::cout << "Foo::Foo\n"; }
        ~Foo() { std::cout << "Foo::~Foo\n"; } 
        std::shared_ptr<Foo> getFoo() { return shared_from_this(); }
    };
     
    int main()
    {
        Foo *f = new Foo;
        std::shared_ptr<Foo> pf1;
     
        {
            std::shared_ptr<Foo> pf2(f);
            pf1 = pf2->getFoo(); // compartilha a propriedade do objeto com pf2
        }
     
        std::cout << "pf2 is gone\n";   
    }
```

Saída:
```
    Foo::Foo
    pf2 is gone
    Foo::~Foo
```

### Veja também

[ shared_ptr](<#/doc/memory/shared_ptr>)(C++11) | smart pointer com semântica de propriedade de objeto compartilhada
(modelo de classe)