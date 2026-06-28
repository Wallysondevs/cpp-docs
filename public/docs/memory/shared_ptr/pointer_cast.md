# std::static_pointer_cast, std::dynamic_pointer_cast, std::const_pointer_cast, std::reinterpret_pointer_cast

Definido no header `[<memory>](<#/doc/header/memory>)`

```cpp
template< class T, class U >
std::shared_ptr<T> static_pointer_cast( const std::shared_ptr<U>& r ) noexcept;  // (1) (desde C++11)
template< class T, class U >
std::shared_ptr<T> static_pointer_cast( std::shared_ptr<U>&& r ) noexcept;  // (2) (desde C++20)
template< class T, class U >
std::shared_ptr<T> dynamic_pointer_cast( const std::shared_ptr<U>& r ) noexcept;  // (3) (desde C++11)
template< class T, class U >
std::shared_ptr<T> dynamic_pointer_cast( std::shared_ptr<U>&& r ) noexcept;  // (4) (desde C++20)
template< class T, class U >
std::shared_ptr<T> const_pointer_cast( const std::shared_ptr<U>& r ) noexcept;  // (5) (desde C++11)
template< class T, class U >
std::shared_ptr<T> const_pointer_cast( std::shared_ptr<U>&& r ) noexcept;  // (6) (desde C++20)
template< class T, class U >
std::shared_ptr<T> reinterpret_pointer_cast( const std::shared_ptr<U>& r ) noexcept;  // (7) (desde C++17)
template< class T, class U >
std::shared_ptr<T> reinterpret_pointer_cast( std::shared_ptr<U>&& r ) noexcept;  // (8) (desde C++20)
```

Cria uma nova instância de [std::shared_ptr](<#/doc/memory/shared_ptr>) cujo ponteiro armazenado é obtido do ponteiro armazenado de r usando uma expressão de cast.

Se r estiver vazio, o novo `shared_ptr` também estará (mas seu ponteiro armazenado não é necessariamente nulo). Caso contrário, o novo `shared_ptr` compartilhará a propriedade com o valor inicial de r, exceto que ele estará vazio se o `dynamic_cast` realizado por `dynamic_pointer_cast` retornar um ponteiro nulo.

Seja `Y` typename [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;::element_type, então o ponteiro armazenado do [std::shared_ptr](<#/doc/memory/shared_ptr>) resultante será obtido avaliando, respectivamente:

1,2) static_cast<Y*>(r.get())

3,4) dynamic_cast<Y*>(r.get()). Se o resultado do `dynamic_cast` for um valor de ponteiro nulo, o `shared_ptr` retornado estará vazio.

5,6) const_cast<Y*>(r.get())

7,8) reinterpret_cast<Y*>(r.get())

O comportamento dessas funções é indefinido a menos que o cast correspondente de `U*` para `T*` seja bem formado:

1,2) O comportamento é indefinido a menos que static_cast<T*>((U*)nullptr) seja bem formado.

3,4) O comportamento é indefinido a menos que dynamic_cast<T*>((U*)nullptr) seja bem formado.

5,6) O comportamento é indefinido a menos que const_cast<T*>((U*)nullptr) seja bem formado.

7,8) O comportamento é indefinido a menos que reinterpret_cast<T*>((U*)nullptr) seja bem formado.

Após chamar as sobrecargas rvalue (2,4,6,8), r estará vazio e r.get() == nullptr, exceto que r não é modificado para `dynamic_pointer_cast` (4) se o dynamic_cast falhar. | (desde C++20)

### Parâmetros

- **r** — o ponteiro a ser convertido

### Observações

As expressões [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;(static_cast<T*>(r.get())), [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;(dynamic_cast<T*>(r.get())) e [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;(const_cast<T*>(r.get())) podem parecer ter o mesmo efeito, mas todas provavelmente resultarão em comportamento indefinido, tentando deletar o mesmo objeto duas vezes!

### Implementação possível

[static_pointer_cast](<#/doc/memory/shared_ptr/pointer_cast>)
---
```cpp
    template<class T, class U>
    std::shared_ptr<T> static_pointer_cast(const std::shared_ptr<U>& r) noexcept
    {
        auto p = static_cast<typename std::shared_ptr<T>::element_type*>(r.get());
        return std::shared_ptr<T>{r, p};
    }
```

[dynamic_pointer_cast](<#/doc/memory/shared_ptr/pointer_cast>)
```cpp
    template<class T, class U>
    std::shared_ptr<T> dynamic_pointer_cast(const std::shared_ptr<U>& r) noexcept
    {
        if (auto p = dynamic_cast<typename std::shared_ptr<T>::element_type*>(r.get()))
            return std::shared_ptr<T>{r, p};
        else
            return std::shared_ptr<T>{};
    }
```

[const_pointer_cast](<#/doc/memory/shared_ptr/pointer_cast>)
```cpp
    template<class T, class U>
    std::shared_ptr<T> const_pointer_cast(const std::shared_ptr<U>& r) noexcept
    {
        auto p = const_cast<typename std::shared_ptr<T>::element_type*>(r.get());
        return std::shared_ptr<T>{r, p};
    }
```

[reinterpret_pointer_cast](<#/doc/memory/shared_ptr/pointer_cast>)
```cpp
    template<class T, class U>
    std::shared_ptr<T> reinterpret_pointer_cast(const std::shared_ptr<U>& r) noexcept
    {
        auto p = reinterpret_cast<typename std::shared_ptr<T>::element_type*>(r.get());
        return std::shared_ptr<T>{r, p};
    }
```

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    
    class Base
    {
    public:
        int a;
        virtual void f() const { std::cout << "I am base!\n"; }
        virtual ~Base() {}
    };
    
    class Derived : public Base
    {
    public:
        void f() const override { std::cout << "I am derived!\n"; }
        ~Derived() {}
    };
    
    int main()
    {
        auto basePtr = std::make_shared<Base>();
        std::cout << "Base pointer says: ";
        basePtr->f();
    
        auto derivedPtr = std::make_shared<Derived>();
        std::cout << "Derived pointer says: ";
        derivedPtr->f();
    
        // static_pointer_cast para subir na hierarquia de classes
        basePtr = std::static_pointer_cast<Base>(derivedPtr);
        std::cout << "Base pointer to derived says: ";
        basePtr->f();
    
        // dynamic_pointer_cast para descer/atravessar a hierarquia de classes
        auto downcastedPtr = std::dynamic_pointer_cast<Derived>(basePtr);
        if (downcastedPtr)
        {
            std::cout << "Downcasted pointer says: ";
            downcastedPtr->f();
        }
    
        // Todos os ponteiros para derived compartilham a propriedade
        std::cout << "Pointers to underlying derived: "
                  << derivedPtr.use_count()
                  << '\n';
    }
```

Saída:
```
    Base pointer says: I am base!
    Derived pointer says: I am derived!
    Base pointer to derived says: I am derived!
    Downcasted pointer says: I am derived!
    Pointers to underlying derived: 3
```

### Veja também

[ (constructor)](<#/doc/memory/shared_ptr/shared_ptr>) | constrói um novo `shared_ptr`
(função membro pública)