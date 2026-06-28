# std::swap(std::unique_ptr)

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T, class D >
void swap( std::unique_ptr<T, D>& lhs, std::unique_ptr<T, D>& rhs ) noexcept;
(constexpr desde C++23)
```

Especializa o algoritmo [std::swap](<#/doc/utility/swap>) para [std::unique_ptr](<#/doc/memory/unique_ptr>). Troca o conteúdo de lhs e rhs. Chama lhs.swap(rhs).

Esta função não participa da resolução de sobrecarga a menos que [std::is_swappable_v](<#/doc/types/is_swappable>)&lt;D&gt; seja true. | (desde C++17)

### Parâmetros

- **lhs, rhs** — ponteiros inteligentes cujo conteúdo será trocado

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
        std::unique_ptr<Foo> p1 = std::make_unique<Foo>(100);
        std::unique_ptr<Foo> p2 = std::make_unique<Foo>(200);
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
[ swap](<#/doc/memory/unique_ptr/swap>) | troca o conteúdo
(função membro pública)