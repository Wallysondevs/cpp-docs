# std::shared_ptr&lt;T&gt;::swap

```cpp
void swap( shared_ptr& r ) noexcept;  // (desde C++11)
```

  
Troca os valores de ponteiro armazenados e as propriedades de *this e r. As contagens de referência, se houver, não são ajustadas.

### Parâmetros

r  |  \-  |  smart pointer para trocar o conteúdo com   
  
### Valor de retorno

(nenhum) 

### Exemplo

Execute este código
```
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
        std::shared_ptr<Foo> p1 = std::make_shared<Foo>(100);
        std::shared_ptr<Foo> p2 = std::make_shared<Foo>(200);
        auto print = &
        {
            std::cout << " p1=" << (p1 ? p1->print() : "nullptr");
            std::cout << " p2=" << (p2 ? p2->print() : "nullptr") << '\n';  
        };
        print();
     
        p1.swap(p2);
        print();
     
        p1.reset();
        print();
     
        p1.swap(p2);
        print();   
    }
```

Saída: 
```
    Foo...
    Foo...
     p1=100 p2=200
     p1=200 p2=100
    ~Foo...
     p1=nullptr p2=100
     p1=100 p2=nullptr
    ~Foo...
```