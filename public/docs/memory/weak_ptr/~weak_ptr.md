# std::weak_ptr&lt;T&gt;::~weak_ptr

```cpp
~weak_ptr();  // (desde C++11)
```

Destrói o objeto `weak_ptr`. Não resulta em nenhum efeito no objeto gerenciado.

### Exemplo

O programa mostra o efeito de "não quebrar" o ciclo de [std::shared_ptr](<#/doc/memory/shared_ptr>)s.

Execute este código
```
    #include <iostream>
    #include <memory>
    #include <variant>
    
    class Node
    {
        char id;
        std::variant<std::weak_ptr<Node>, std::shared_ptr<Node>> ptr;
    public:
        Node(char id) : id{id} {}
        ~Node() { std::cout << "  '" << id << "' reclaimed\n"; }
        /*...*/
        void assign(std::weak_ptr<Node> p) { ptr = p; }
        void assign(std::shared_ptr<Node> p) { ptr = p; }
    };
    
    enum class shared { all, some };
    
    void test_cyclic_graph(const shared x)
    {
        auto A = std::make_shared<Node>('A');
        auto B = std::make_shared<Node>('B');
        auto C = std::make_shared<Node>('C');
    
        A->assign(B);
        B->assign(C);
    
        if (shared::all == x)
        {
            C->assign(A);
            std::cout << "All links are shared pointers";
        }
        else
        {
            C->assign(std::weak_ptr<Node>(A));
            std::cout << "One link is a weak_ptr";
        }
        /*...*/
        std::cout << "\nLeaving...\n";
    }
    
    int main()
    {
        test_cyclic_graph(shared::some);
        test_cyclic_graph(shared::all); // produces a memory leak
    }
```

Saída:
```
    One link is a weak_ptr
    Leaving...
      'A' reclaimed
      'B' reclaimed
      'C' reclaimed
    All links are shared pointers
    Leaving...
```

### Veja também

[ (destrutor)](<#/doc/memory/shared_ptr/~shared_ptr>) | destrói o objeto possuído se não houver mais `shared_ptr`s apontando para ele
(função membro pública de `std::shared_ptr<T>`)