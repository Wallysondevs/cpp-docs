# std::swap(std::shared_ptr)

Definido no cabeçalho `<memory>`

```c
template< class T >
void swap( std::shared_ptr<T>& lhs, std::shared_ptr<T>& rhs ) noexcept;
```

Especializa o algoritmo [std::swap](<#/doc/utility/swap>) para [std::shared_ptr](<#/doc/memory/shared_ptr>). Troca o conteúdo de lhs e rhs. Chama lhs.swap(rhs).

### Parâmetros

- **lhs, rhs** — smart pointers cujo conteúdo será trocado

### Valor de retorno

(nenhum)

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    #include <string>
    
    struct Foo {
        Foo(int _val) : val(_val) { std::cout << "Foo...\n"; }
        ~Foo() { std::cout << "~Foo...\n"; }
        std::string print() { return std::to_string(val); }
        int val;
    };
    
    int main()
    {
        std::shared_ptr<Foo> p1 = std::make_shared<Foo>(100);
        std::shared_ptr<Foo> p2 = std::make_shared<Foo>(200);
        auto print = & {
            std::cout << " p1=" << (p1 ? p1->print() : "nullptr");
            std::cout << " p2=" << (p2 ? p2->print() : "nullptr") << '\n';  
        };
        print();
    
        std::swap(p1, p2);
        print();
    
        p1.reset();
        print();
    
        std::swap(p1, p2);
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

### Veja também

[ swap](<#/doc/utility/swap>) | troca os valores de dois objetos
(modelo de função)
[ swap](<#/doc/memory/shared_ptr/swap>) | troca o conteúdo
(função membro pública)