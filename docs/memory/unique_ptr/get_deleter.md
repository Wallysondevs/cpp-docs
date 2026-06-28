# std::unique_ptr&lt;T,Deleter&gt;::get_deleter

```cpp
Deleter& get_deleter() noexcept;  // (desde C++11)
(constexpr desde C++23)
const Deleter& get_deleter() const noexcept;  // (desde C++11)
(constexpr desde C++23)
```

Retorna o objeto deleter que seria usado para a destruição do objeto gerenciado.

### Parâmetros

(nenhum)

### Valor de retorno

O objeto deleter armazenado.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    
    struct Foo
    {
        Foo() { std::cout << "Foo() 0x" << std::hex << (void*)this << '\n'; }
        ~Foo() { std::cout << "~Foo() 0x" << std::hex << (void*)this << '\n'; }
    };
    
    struct D
    {
        int number;
    
        void bar()
        {
            std::cout << "call D::bar(), my number is: " << std::dec << number << '\n';
        }
    
        void operator()(Foo* p) const
        {
            std::cout << "call deleter for Foo object 0x" << std::hex << (void*)p << '\n';
            delete p;
        }
    };
    
    int main()
    {
        std::cout << "main start\n";
    
        std::unique_ptr<Foo, D> up1(new Foo(), D(42));
        D& del1 = up1.get_deleter();
        del1.bar();
    
        std::unique_ptr<Foo, D> up2(new Foo(), D(43));
        D& del2 = up2.get_deleter();
        auto* released = up2.release();
        del2(released);
    
        std::cout << "main end\n";
    }
```

Saída:
```
    main start
    Foo() 0x0x90cc30
    call D::bar(), my number is: 42
    Foo() 0x0x90cc50
    call deleter for Foo object 0x0x90cc50
    ~Foo() 0x0x90cc50
    main end
    call deleter for Foo object 0x0x90cc30
    ~Foo() 0x0x90cc30
```

### Veja também

[ get_deleter](<#/doc/memory/shared_ptr/get_deleter>) | retorna o deleter do tipo especificado, se possuído
(modelo de função)