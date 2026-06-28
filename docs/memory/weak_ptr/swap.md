# std::weak_ptr&lt;T&gt;::swap

```cpp
void swap( weak_ptr& r ) noexcept;  // (desde C++11)
```

  
Troca os valores de ponteiro armazenados e as propriedades de *this e r. As contagens de referência, se houver, não são ajustadas. 

### Parâmetros

r  |  \-  |  smart pointer para trocar o conteúdo com   
  
### Valor de retorno

(nenhum) 

### Exemplo

Executar este código
```cpp
    #include <iostream>
    #include <memory>
    #include <string>
     
    struct Foo
    {
        Foo(int _val) : val(_val) { std::cout << "Foo...\n"; }
        ~Foo() { std::cout << "~Foo...\n"; }
        std::string print() { return std::to_string(val); }
        int val;
    };
     
    int main()
    {
        std::shared_ptr<Foo> sp1 = std::make_shared<Foo>(100);
        std::shared_ptr<Foo> sp2 = std::make_shared<Foo>(200);
        std::weak_ptr<Foo> wp1 = sp1;
        std::weak_ptr<Foo> wp2 = sp2;
        auto print = &
        {
            auto p1 = wp1.lock();
            auto p2 = wp2.lock();
            std::cout << " p1=" << (p1 ? p1->print() : "nullptr");
            std::cout << " p2=" << (p2 ? p2->print() : "nullptr") << '\n';  
        };
        print();
     
        wp1.swap(wp2);
        print();
     
        wp1.reset();
        print();
     
        wp1.swap(wp2);
        print();   
    }
```

Saída: 
```
    Foo...
    Foo...
     p1=100 p2=200
     p1=200 p2=100
     p1=nullptr p2=100
     p1=100 p2=nullptr
    ~Foo...
    ~Foo...
```