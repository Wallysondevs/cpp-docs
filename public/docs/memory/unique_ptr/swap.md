# std::unique_ptr&lt;T,Deleter&gt;::swap

```cpp
void swap( unique_ptr& other ) noexcept;  // (desde C++11)
```

Troca os objetos gerenciados e os deleters associados de *this e de outro objeto unique_ptr other.

### Parâmetros

- **other** — outro objeto unique_ptr para trocar o objeto gerenciado e o deleter com

### Valor de retorno

(nenhum)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    
    struct Foo
    {
        Foo(int _val) : val(_val) { std::cout << "Foo...\n"; }
        ~Foo() { std::cout << "~Foo...\n"; }
        int val;
    };
    
    int main()
    {
        std::unique_ptr<Foo> up1(new Foo(1));
        std::unique_ptr<Foo> up2(new Foo(2));
    
        up1.swap(up2);
    
        std::cout << "up1->val:" << up1->val << '\n';
        std::cout << "up2->val:" << up2->val << '\n';
    }
```

Saída:
```
    Foo...
    Foo...
    up1->val:2
    up2->val:1
    ~Foo...
    ~Foo...
```