# std::hash&lt;std::unique_ptr&gt;

```cpp
template< class T, class Deleter >
struct hash<std::unique_ptr<T, Deleter>>;  // (desde C++11)
```

  
A especialização de template de [std::hash](<#/doc/utility/hash>) para [std::unique_ptr](<#/doc/memory/unique_ptr>)<T, Deleter> permite aos usuários obter hashes de objetos do tipo [std::unique_ptr](<#/doc/memory/unique_ptr>)<T, Deleter>. 

A especialização [std::hash](<#/doc/utility/hash>)<[std::unique_ptr](<#/doc/memory/unique_ptr>)<T,D>> é habilitada (veja [std::hash](<#/doc/utility/hash>)) se [std::hash](<#/doc/utility/hash>)<typename [std::unique_ptr](<#/doc/memory/unique_ptr>)<T,D>::pointer> é habilitada, e é desabilitada caso contrário. 

Quando habilitada, para um dado [std::unique_ptr](<#/doc/memory/unique_ptr>)<T, D> p, esta especialização garante que [std::hash](<#/doc/utility/hash>)<[std::unique_ptr](<#/doc/memory/unique_ptr>)<T, D>>()(p) == [std::hash](<#/doc/utility/hash>)<typename [std::unique_ptr](<#/doc/memory/unique_ptr>)<T, D>::pointer>()(p.get()). 

As funções membro desta especialização não são garantidas como noexcept porque o ponteiro pode ser um ponteiro "fancy" e seu hash pode lançar uma exceção. 

### Exemplo

Execute este código
```cpp 
    #include <functional>
    #include <iostream>
    #include <memory>
    
    struct Foo
    {
        Foo(int num) : nr(num) { std::cout << "Foo(" << nr << ")\n"; }
    
        ~Foo() { std::cout << "~Foo()\n"; }
    
        bool operator==(const Foo &other) const { return nr == other.nr; };
    
        int nr;
    };
    
    int main()
    {
        std::cout << std::boolalpha << std::hex;
    
        Foo* foo = new Foo(5);
        std::unique_ptr<Foo> up(foo); 
        std::cout << "hash(up):    " << std::hash<std::unique_ptr<Foo>>()(up) << '\n'
                  << "hash(foo):   " << std::hash<Foo*>()(foo) << '\n'
                  << "*up==*foo:   " << (*up == *foo) << "\n\n";
    
        std::unique_ptr<Foo> other = std::make_unique<Foo>(5);
        std::cout << "hash(up):    " << std::hash<std::unique_ptr<Foo>>()(up) << '\n'
                  << "hash(other): " << std::hash<std::unique_ptr<Foo>>()(other) << '\n'
                  << "*up==*other: " <<(*up == *other) << "\n\n";
    }
```

Saída possível: 
```
    Foo(5)
    hash(up):    acac20
    hash(foo):   acac20
    *up==*foo:   true
    
    Foo(5)
    hash(up):    acac20
    hash(other): acbc50
    *up==*other: true
    
    ~Foo()
    ~Foo()
```

### Veja também

[ hash](<#/doc/utility/hash>)(C++11) |  objeto de função hash   
(template de classe)  