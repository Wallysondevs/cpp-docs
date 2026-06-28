# std::shared_ptr&lt;T&gt;::~shared_ptr

~shared_ptr();

  
Se *this possui um objeto e é o último `shared_ptr` a possuí-lo, o objeto é destruído através do deleter possuído.

Após a destruição, os smart pointers que compartilhavam a posse com *this, se houver, reportarão um [use_count()](<#/doc/memory/shared_ptr/use_count>) que é um a menos que seu valor anterior.

### Notas

Ao contrário de [std::unique_ptr](<#/doc/memory/unique_ptr>), o deleter de [std::shared_ptr](<#/doc/memory/shared_ptr>) é invocado mesmo se o ponteiro gerenciado for nulo.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <memory>
     
    struct S
    {
        S() { std::cout << "S::S()\n"; }
        ~S() { std::cout << "S::~S()\n"; }
        struct Deleter
        {
            void operator()(S* s) const
            {
                std::cout << "S::Deleter()\n";
                delete s;
            }
        };
    };
     
    int main()
    {
        auto sp = std::shared_ptr<S>{new S, S::Deleter{}};
     
        auto use_count = &sp
        {
            std::cout << c << ") use_count(): " << sp.use_count() << '\n';
        };
     
        use_count('A');
        {
            auto sp2 = sp;
            use_count('B');
            {
                auto sp3 = sp;
                use_count('C');
            }
            use_count('D');
        }
        use_count('E');
     
    //  sp.reset();
    //  use_count('F'); // would print "F) use_count(): 0"
    }
```

Saída: 
```
    S::S()
    A) use_count(): 1
    B) use_count(): 2
    C) use_count(): 3
    D) use_count(): 2
    E) use_count(): 1
    S::Deleter()
    S::~S()
```

### Veja também

[ (destructor)](<#/doc/memory/weak_ptr/~weak_ptr>) | destrói um `weak_ptr`   
(função membro pública de `std::weak_ptr<T>`)  