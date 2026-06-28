# std::shared_ptr&lt;T&gt;::get

```cpp
T* get() const noexcept;  // (até C++17)
element_type* get() const noexcept;  // (desde C++17)
```

Retorna o ponteiro armazenado.

### Parâmetros

(nenhum)

### Valor de retorno

O ponteiro armazenado.

### Observações

Um `shared_ptr` pode compartilhar a propriedade de um objeto enquanto armazena um ponteiro para outro objeto. `get()` retorna o ponteiro armazenado, não o ponteiro gerenciado.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    #include <string_view>
    
    int main()
    {
        auto output =  msg, int const* pInt)
        {
            std::cout << msg << *pInt << " in " << pInt << '\n';
        };
    
        int* pInt = new int(42);
        std::shared_ptr<int> pShared = std::make_shared<int>(42);
    
        output("Naked pointer: ", pInt);
    //  output("Shared pointer: ", pShared); // erro de compilação
        output("Shared pointer: ", &*pShared); // OK, chama operator*, então pega o endereço
        output("Shared pointer with get(): ", pShared.get());
    
        delete pInt;
    
        std::cout << "\nThe shared_ptr's aliasing constructor demo.\n";
        struct Base1 { int i1{}; };
        struct Base2 { int i2{}; };
        struct Derived : Base1, Base2 { int i3{}; };
    
        std::shared_ptr<Derived> p(new Derived());
        std::shared_ptr<Base2> q(p, static_cast<Base2*>(p.get()));
        std::cout << "q shares ownership with p, but points to Base2 subobject:\n"
                  << "p.get(): " << p.get() << '\n'
                  << "q.get(): " << q.get() << '\n'
                  << "&(p->i1): " << &(p->i1) << '\n'
                  << "&(p->i2): " << &(p->i2) << '\n'
                  << "&(p->i3): " << &(p->i3) << '\n'
                  << "&(q->i2): " << &(q->i2) << '\n';
    }
```

Saída possível:
```
    Naked pointer: 42 in 0xacac20
    Shared pointer: 42 in 0xacac50
    Shared pointer with get(): 42 in 0xacac50
    
    The shared_ptr's aliasing constructor demo.
    q shares ownership with p, but points to Base2 subobject:
    p.get(): 0xacac20
    q.get(): 0xacac24
    &(p->i1): 0xacac20
    &(p->i2): 0xacac24
    &(p->i3): 0xacac28
    &(q->i2): 0xacac24
```

### Veja também

```cpp
 operator*operator-> | desreferencia o ponteiro armazenado
(função membro pública)
```