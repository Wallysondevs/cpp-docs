# std::unique_ptr&lt;T,Deleter&gt;::unique_ptr

```cpp
membros do template primário, unique_ptr<T>
constexpr unique_ptr() noexcept;
constexpr unique_ptr( std::nullptr_t ) noexcept;  // (1)
explicit unique_ptr( pointer p ) noexcept; | (2) | (constexpr desde C++23)
unique_ptr( pointer p, /* see below */ d1 ) noexcept; | (3) | (constexpr desde C++23)
unique_ptr( pointer p, /* see below */ d2 ) noexcept; | (4) | (constexpr desde C++23)
unique_ptr( unique_ptr&& u ) noexcept; | (5) | (constexpr desde C++23)
template< class U, class E >
unique_ptr( unique_ptr<U, E>&& u ) noexcept; | (6) | (constexpr desde C++23)
unique_ptr( const unique_ptr& ) = delete;  // (7)
template< class U >
unique_ptr( std::auto_ptr<U>&& u ) noexcept; | (8) | (removido em C++17)
membros da especialização para arrays, unique_ptr<T[]>
constexpr unique_ptr() noexcept;
constexpr unique_ptr( std::nullptr_t ) noexcept;  // (1)
template< class U >
explicit unique_ptr( U p ) noexcept; | (2) | (constexpr desde C++23)
template< class U >
unique_ptr( U p, /* see below */ d1 ) noexcept; | (3) | (constexpr desde C++23)
template< class U >
unique_ptr( U p, /* see below */ d2 ) noexcept; | (4) | (constexpr desde C++23)
unique_ptr( unique_ptr&& u ) noexcept; | (5) | (constexpr desde C++23)
template< class U, class E >
unique_ptr( unique_ptr<U, E>&& u ) noexcept; | (6) | (constexpr desde C++23)
unique_ptr( const unique_ptr& ) = delete;  // (7)
```

1) Constrói um `std::unique_ptr` que não possui nada. Inicializa por valor o ponteiro armazenado e o deleter armazenado. Requer que `Deleter` seja [DefaultConstructible](<#/doc/named_req/DefaultConstructible>) e que a construção não lance uma exceção. Essas sobrecargas participam da resolução de sobrecarga somente se [std::is_default_constructible](<#/doc/types/is_default_constructible>)&lt;Deleter&gt;::value for true e Deleter não for um tipo de ponteiro.

2) Constrói um `std::unique_ptr` que possui p, inicializando o ponteiro armazenado com p e inicializando por valor o deleter armazenado. Requer que `Deleter` seja [DefaultConstructible](<#/doc/named_req/DefaultConstructible>) e que a construção não lance uma exceção. Essa sobrecarga participa da resolução de sobrecarga somente se [std::is_default_constructible](<#/doc/types/is_default_constructible>)&lt;Deleter&gt;::value for true e Deleter não for um tipo de ponteiro. Este construtor não é selecionado por [dedução de argumento de template de classe](<#/doc/language/ctad>). | (desde C++17)

3,4) Constrói um objeto `std::unique_ptr` que possui p, inicializando o ponteiro armazenado com p e inicializando um deleter `D` conforme abaixo (depende se `D` é um tipo de referência).

a) Se `D` for um tipo não-referência A, então as assinaturas são: unique_ptr(pointer p, const A& d) noexcept; | (1) | (requer que `Deleter` seja nothrow-[CopyConstructible](<#/doc/named_req/CopyConstructible>))
---|---|---
unique_ptr(pointer p, A&& d) noexcept; | (2) | (requer que `Deleter` seja nothrow-[MoveConstructible](<#/doc/named_req/MoveConstructible>))

```cpp
b) Se `D` for um tipo de referência lvalue A&, então as assinaturas são: unique_ptr(pointer p, A& d) noexcept;  // (1)
unique_ptr(pointer p, A&& d) = delete;  // (2)
```

```cpp
c) Se `D` for um tipo de referência lvalue const A&, então as assinaturas são: unique_ptr(pointer p, const A& d) noexcept;  // (1)
unique_ptr(pointer p, const A&& d) = delete;  // (2)
```

```cpp
Em todos os casos, o deleter é inicializado a partir de std::forward<decltype(d)>(d). Essas sobrecargas participam da resolução de sobrecarga somente se std::is_constructible<D, decltype(d)>::value for true. Esses dois construtores não são selecionados por dedução de argumento de template de classe.  // (desde C++17)
```

2-4) Na especialização para arrays, comportam-se da mesma forma que os construtores que recebem um parâmetro ponteiro no template primário, exceto que eles adicionalmente não participam da resolução de sobrecarga a menos que uma das seguintes condições seja verdadeira:

*   `U` é do mesmo tipo que `pointer`, ou
*   `U` é [std::nullptr_t](<#/doc/types/nullptr_t>), ou
*   `pointer` é do mesmo tipo que `element_type*` e `U` é algum tipo de ponteiro `V*` tal que `V(*)[]` é implicitamente conversível para `element_type(*)[]`.

5) Constrói um `unique_ptr` transferindo a propriedade de u para *this e armazena o ponteiro nulo em u. Este construtor participa da resolução de sobrecarga somente se [std::is_move_constructible](<#/doc/types/is_move_constructible>)&lt;Deleter&gt;::value for true. Se `Deleter` não for um tipo de referência, requer que seja nothrow-[MoveConstructible](<#/doc/named_req/MoveConstructible>) (se `Deleter` for uma referência, `get_deleter()` e `u.get_deleter()` após a construção por movimento referenciam o mesmo valor).

6) Constrói um `unique_ptr` transferindo a propriedade de u para *this, onde u é construído com um deleter especificado (`E`). Depende se `E` é um tipo de referência, da seguinte forma:

a) se `E` for um tipo de referência, este deleter é construído por cópia a partir do deleter de u (requer que esta construção não lance uma exceção),

b) se `E` for um tipo não-referência, este deleter é construído por movimento a partir do deleter de u (requer que esta construção não lance uma exceção).

Este construtor participa da resolução de sobrecarga somente se todas as seguintes condições forem verdadeiras:

a) unique_ptr<U, E>::pointer é implicitamente conversível para `pointer`,

b) U não é um tipo de array,

c) ou `Deleter` é um tipo de referência e `E` é do mesmo tipo que `Deleter`, ou `Deleter` não é um tipo de referência e `E` é implicitamente conversível para `Deleter`.

6) Na especialização para arrays, comporta-se da mesma forma que no template primário, exceto que participará da resolução de sobrecarga somente se todas as seguintes condições forem verdadeiras:

*   `U` é um tipo de array,
*   `pointer` é do mesmo tipo que `element_type*`,
*   unique_ptr<U,E>::pointer é do mesmo tipo que unique_ptr<U,E>::element_type*,
*   unique_ptr<U,E>::element_type(*)[] é conversível para `element_type(*)[]`,
*   ou `Deleter` é um tipo de referência e `E` é do mesmo tipo que `Deleter`, ou `Deleter` não é um tipo de referência e `E` é implicitamente conversível para `Deleter`.

7) O construtor de cópia é explicitamente deletado.

8) Constrói um `unique_ptr` onde o ponteiro armazenado é inicializado com [`u.release()`](<#/doc/memory/auto_ptr/release>) e o deleter armazenado é inicializado por valor. Este construtor participa da resolução de sobrecarga somente se `U*` for implicitamente conversível para `T*` e `Deleter` for do mesmo tipo que [std::default_delete](<#/doc/memory/default_delete>)&lt;T&gt;.

### Parâmetros

- **p** — um ponteiro para um objeto a ser gerenciado
- **d1, d2** — um deleter a ser usado para destruir o objeto
- **u** — outro smart pointer do qual adquirir a propriedade

### Notas

Em vez de usar a sobrecarga (2) junto com new, é frequentemente uma ideia melhor usar [std::make_unique&lt;T&gt;](<#/doc/memory/unique_ptr/make_unique>). | (desde C++14)

[std::unique_ptr](<#/doc/memory/unique_ptr>)&lt;Derived&gt; é implicitamente conversível para [std::unique_ptr](<#/doc/memory/unique_ptr>)&lt;Base&gt; através da sobrecarga (6) (porque tanto o ponteiro gerenciado quanto [std::default_delete](<#/doc/memory/default_delete>) são implicitamente conversíveis).

Como o construtor padrão é constexpr, unique_ptrs estáticos são inicializados como parte da [inicialização estática não-local](<#/doc/language/initialization>), antes que qualquer inicialização dinâmica não-local comece. Isso torna seguro usar um unique_ptr em um construtor de qualquer objeto estático.

Não há [dedução de argumento de template de classe](<#/doc/language/ctad>) a partir do tipo de ponteiro porque é impossível distinguir um ponteiro obtido de formas de new para array e não-array. | (desde C++17)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    
    struct Foo // object to manage
    {
        Foo() { std::cout << "Foo ctor\n"; }
        Foo(const Foo&) { std::cout << "Foo copy ctor\n"; }
        Foo(Foo&&) { std::cout << "Foo move ctor\n"; }
        ~Foo() { std::cout << "~Foo dtor\n"; }
    };
    
    struct D // deleter
    {
        D() {};
        D(const D&) { std::cout << "D copy ctor\n"; }
        D(D&) { std::cout << "D non-const copy ctor\n"; }
        D(D&&) { std::cout << "D move ctor \n"; }
        void operator()(Foo* p) const
        {
            std::cout << "D is deleting a Foo\n";
            delete p;
        };
    };
    
    int main()
    {
        std::cout << "Example constructor(1)...\n";
        std::unique_ptr<Foo> up1; // up1 is empty
        std::unique_ptr<Foo> up1b(nullptr); // up1b is empty
    
        std::cout << "Example constructor(2)...\n";
        {
            std::unique_ptr<Foo> up2(new Foo); //up2 now owns a Foo
        } // Foo deleted
    
        std::cout << "Example constructor(3)...\n";
        D d;
        {   // deleter type is not a reference
            std::unique_ptr<Foo, D> up3(new Foo, d); // deleter copied
        }
        {   // deleter type is a reference
            std::unique_ptr<Foo, D&> up3b(new Foo, d); // up3b holds a reference to d
        }
    
        std::cout << "Example constructor(4)...\n";
        {   // deleter is not a reference
            std::unique_ptr<Foo, D> up4(new Foo, D()); // deleter moved
        }
    
        std::cout << "Example constructor(5)...\n";
        {
            std::unique_ptr<Foo> up5a(new Foo);
            std::unique_ptr<Foo> up5b(std::move(up5a)); // ownership transfer
        }
    
        std::cout << "Example constructor(6)...\n";
        {
            std::unique_ptr<Foo, D> up6a(new Foo, d); // D is copied
            std::unique_ptr<Foo, D> up6b(std::move(up6a)); // D is moved
    
            std::unique_ptr<Foo, D&> up6c(new Foo, d); // D is a reference
            std::unique_ptr<Foo, D> up6d(std::move(up6c)); // D is copied
        }
    
    #if (__cplusplus < 201703L)
        std::cout << "Example constructor(7)...\n";
        {
            std::auto_ptr<Foo> up7a(new Foo);
            std::unique_ptr<Foo> up7b(std::move(up7a)); // ownership transfer
        }
    #endif
    
        std::cout << "Example array constructor...\n";
        {
            std::unique_ptr<Foo[]> up(new Foo[3]);
        } // three Foo objects deleted
    }
```

Saída:
```
    Example constructor(1)...
    Example constructor(2)...
    Foo ctor
    ~Foo dtor
    Example constructor(3)...
    Foo ctor
    D copy ctor
    D is deleting a Foo
    ~Foo dtor
    Foo ctor
    D is deleting a Foo
    ~Foo dtor
    Example constructor(4)...
    Foo ctor
    D move ctor
    D is deleting a Foo
    ~Foo dtor
    Example constructor(5)...
    Foo ctor
    ~Foo dtor
    Example constructor(6)...
    Foo ctor
    D copy ctor
    D move ctor
    Foo ctor
    D non-const copy ctor
    D is deleting a Foo
    ~Foo dtor
    D is deleting a Foo
    ~Foo dtor
    Example constructor(7)...
    Foo ctor
    ~Foo dtor
    Example array constructor...
    Foo ctor
    Foo ctor
    Foo ctor
    ~Foo dtor
    ~Foo dtor
    ~Foo dtor
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 2118](<https://cplusplus.github.io/LWG/issue2118>) | C++11 | Construtores de `unique_ptr<T[]>` rejeitavam conversões de qualificação. | Aceitar.
[LWG 2520](<https://cplusplus.github.io/LWG/issue2520>) | C++11 | `unique_ptr<T[]>` foi acidentalmente tornado não-construtível a partir de `nullptr_t`. | Tornado construtível.
[LWG 2801](<https://cplusplus.github.io/LWG/issue2801>) | C++11 | O construtor padrão não era restrito. | Restrito.
[LWG 2899](<https://cplusplus.github.io/LWG/issue2899>) | C++11 | O construtor de movimento não era restrito. | Restrito.
[LWG 2905](<https://cplusplus.github.io/LWG/issue2905>) | C++11 | A restrição no construtor a partir de um ponteiro e um deleter estava errada. | Corrigida.
[LWG 2944](<https://cplusplus.github.io/LWG/issue2944>) | C++11 | Algumas pré-condições foram acidentalmente removidas por LWG 2905 | Restauradas.