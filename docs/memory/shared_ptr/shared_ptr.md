# std::shared_ptr&lt;T&gt;::shared_ptr

```cpp
constexpr shared_ptr() noexcept;  // (1)
constexpr shared_ptr( std::nullptr_t ) noexcept;  // (2)
template< class Y >
explicit shared_ptr( Y* ptr );  // (3)
template< class Y, class Deleter >
shared_ptr( Y* ptr, Deleter d );  // (4)
template< class Deleter >
shared_ptr( std::nullptr_t ptr, Deleter d );  // (5)
template< class Y, class Deleter, class Alloc >
shared_ptr( Y* ptr, Deleter d, Alloc alloc );  // (6)
template< class Deleter, class Alloc >
shared_ptr( std::nullptr_t ptr, Deleter d, Alloc alloc );  // (7)
template< class Y >
shared_ptr( const shared_ptr<Y>& r, element_type* ptr ) noexcept;  // (8)
template< class Y >
shared_ptr( shared_ptr<Y>&& r, element_type* ptr ) noexcept;  // (8) (desde C++20)
shared_ptr( const shared_ptr& r ) noexcept;  // (9)
template< class Y >
shared_ptr( const shared_ptr<Y>& r ) noexcept;  // (9)
shared_ptr( shared_ptr&& r ) noexcept;  // (10)
template< class Y >
shared_ptr( shared_ptr<Y>&& r ) noexcept;  // (10)
template< class Y >
explicit shared_ptr( const std::weak_ptr<Y>& r );  // (11)
template< class Y >
shared_ptr( std::auto_ptr<Y>&& r ); | (12) | (removido em C++17)
template< class Y, class Deleter >
shared_ptr( std::unique_ptr<Y, Deleter>&& r );  // (13)
```

Constrói um novo `shared_ptr` a partir de uma variedade de tipos de ponteiro que se referem a um objeto a ser gerenciado.

Para os propósitos da descrição abaixo, um tipo de ponteiro `Y*` é considerado _compatível com_ um tipo de ponteiro `T*` se `Y*` for conversível para `T*` ou se `Y` for o tipo array `U[N]` e `T` for `U cv []` (onde cv é um conjunto de qualificadores cv). | (desde C++17)

1,2) Constrói um `shared_ptr` sem objeto gerenciado, ou seja, um `shared_ptr` vazio.

3-7) Constrói um `shared_ptr` com ptr como o ponteiro para o objeto gerenciado. Para (3,4,6), `Y*` deve ser conversível para `T*`. | (ate C++17)
---|---
Se `T` for um tipo array `U[N]`, (3,4,6) não participam da resolução de sobrecarga se `Y(*)[N]` for um tipo inválido ou não conversível para `T*`. Se `T` for um tipo array `U[]`, (3,4,6) não participam da resolução de sobrecarga se `Y(*)[]` for um tipo inválido ou não conversível para `T*`. Caso contrário, (3,4,6) não participam da resolução de sobrecarga se `Y*` não for conversível para `T*`. | (desde C++17)
Adicionalmente:

3) Usa a [expressão delete](<#/doc/language/delete>) delete ptr se `T` não for um tipo array; delete[] ptr se `T` for um tipo array (desde C++17) como o deleter. `Y` deve ser um tipo completo. A expressão delete deve ser bem-formada, ter comportamento bem definido e não lançar exceções. Este construtor adicionalmente não participa da resolução de sobrecarga se a expressão delete não for bem-formada. (desde C++17)

4,5) Usa o deleter d especificado como o deleter. A expressão d(ptr) deve ser bem-formada, ter comportamento bem definido e não lançar exceções. A construção de d e do deleter armazenado copiado a partir dele não deve lançar exceções. `Deleter` deve ser [CopyConstructible](<#/doc/named_req/CopyConstructible>). | (ate C++17)
---|---
Estes construtores adicionalmente não participam da resolução de sobrecarga se a expressão d(ptr) não for bem-formada, ou se [std::is_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;D&gt; for false. | (desde C++17)

6,7) O mesmo que (4,5), mas adicionalmente usa uma cópia de alloc para alocação de dados para uso interno. `Alloc` deve ser um [Allocator](<#/doc/named_req/Allocator>).

8) O _construtor de aliasing_ : constrói um `shared_ptr` que compartilha informações de propriedade com o valor inicial de r, mas mantém um ponteiro ptr não relacionado e não gerenciado. Se este `shared_ptr` for o último do grupo a sair do escopo, ele chamará o deleter armazenado para o objeto originalmente gerenciado por r. No entanto, chamar `get()` neste `shared_ptr` sempre retornará uma cópia de ptr. É responsabilidade do programador garantir que este ptr permaneça válido enquanto este shared_ptr existir, como nos casos de uso típicos onde ptr é um membro do objeto gerenciado por r ou é um alias (por exemplo, downcast) de `r.get()`. Para a segunda sobrecarga que recebe um rvalue, r fica vazio e r.get() == nullptr após a chamada. (desde C++20)

9) Constrói um `shared_ptr` que compartilha a propriedade do objeto gerenciado por r. Se r não gerencia nenhum objeto, *this também não gerencia nenhum objeto. A sobrecarga de template não participa da resolução de sobrecarga se `Y*` não for implicitamente conversível para (ate C++17)_compatível com_ (desde C++17) `T*`.

10) Constrói por movimento um `shared_ptr` a partir de r. Após a construção, *this contém uma cópia do estado anterior de r, r fica vazio e seu ponteiro armazenado é nulo. A sobrecarga de template não participa da resolução de sobrecarga se `Y*` não for implicitamente conversível para (ate C++17)_compatível com_ (desde C++17) `T*`.

11) Constrói um `shared_ptr` que compartilha a propriedade do objeto gerenciado por r. `Y*` deve ser implicitamente conversível para `T*`. (ate C++17) Esta sobrecarga participa da resolução de sobrecarga apenas se `Y*` for compatível com `T*`. (desde C++17) Note que r.lock() pode ser usado para o mesmo propósito: a diferença é que este construtor lança uma exceção se o argumento estiver vazio, enquanto [std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt;::lock() constrói um `std::shared_ptr` vazio nesse caso.

12) Constrói um `shared_ptr` que armazena e possui o objeto anteriormente possuído por r. `Y*` deve ser conversível para `T*`. Após a construção, r fica vazio.

13) Constrói um `shared_ptr` que gerencia o objeto atualmente gerenciado por r. O deleter associado a r é armazenado para futura exclusão do objeto gerenciado. r não gerencia nenhum objeto após a chamada. Esta sobrecarga não participa da resolução de sobrecarga se `std::unique_ptr<Y, Deleter>::pointer` não for _compatível com_ `T*`. Se r.get() for um ponteiro nulo, esta sobrecarga é equivalente ao construtor padrão (1). | (desde C++17)
Se `Deleter` for um tipo de referência, é equivalente a shared_ptr(r.release(), [std::ref](<#/doc/utility/functional/ref>)(r.get_deleter())). Caso contrário, é equivalente a shared_ptr(r.release(), std::move(r.get_deleter())).

Quando `T` não é um tipo array, as sobrecargas (3,4,6) habilitam `shared_from_this` com ptr, e a sobrecarga (13) habilita `shared_from_this` com o ponteiro retornado por r.release().

### Parameters

- **ptr** — um ponteiro para um objeto a ser gerenciado
- **d** — um deleter a ser usado para destruir o objeto
- **alloc** — um allocator a ser usado para alocações de dados para uso interno
- **r** — outro smart pointer para compartilhar a propriedade ou adquirir a propriedade de

### Exceptions

3) [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a memória adicional necessária não puder ser obtida. Pode lançar exceção definida pela implementação para outros erros. Se ocorrer uma exceção, isso chama delete ptr se `T` não for um tipo array, e chama delete[] ptr caso contrário (desde C++17).

4-7) [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a memória adicional necessária não puder ser obtida. Pode lançar exceção definida pela implementação para outros erros. d(ptr) é chamado se ocorrer uma exceção.

11) [std::bad_weak_ptr](<#/doc/memory/bad_weak_ptr>) se r.expired() == true. O construtor não tem efeito neste caso.

12) [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a memória adicional necessária não puder ser obtida. Pode lançar exceção definida pela implementação para outros erros. Este construtor não tem efeito se ocorrer uma exceção.

13) Se uma exceção for lançada, o construtor não tem efeitos.

### Notes

Um construtor _habilita `shared_from_this`_ com um ponteiro ptr do tipo `U*` significa que ele determina se `U` possui uma classe base não ambígua e acessível (desde C++17) que é uma especialização de [std::enable_shared_from_this](<#/doc/memory/enable_shared_from_this>), e, em caso afirmativo, o construtor avalia if (ptr != nullptr && ptr->`_[weak_this](<#/doc/memory/enable_shared_from_this>)_` ﻿.expired())
` `ptr->`_[weak_this](<#/doc/memory/enable_shared_from_this>)_` `= [std::shared_ptr](<#/doc/memory/shared_ptr>)<[std::remove_cv_t](<#/doc/types/remove_cv>)&lt;U&gt;>
` `(*this, const_cast<[std::remove_cv_t](<#/doc/types/remove_cv>)&lt;U&gt;*>(ptr)); .

A atribuição a `_[weak_this](<#/doc/memory/enable_shared_from_this>)_` não é atômica e entra em conflito com qualquer acesso potencialmente concorrente ao mesmo objeto. Isso garante que futuras chamadas a [`shared_from_this()`](<#/doc/memory/enable_shared_from_this/shared_from_this>) compartilharão a propriedade com o [std::shared_ptr](<#/doc/memory/shared_ptr>) criado por este construtor de ponteiro bruto.

O teste ptr->`_[weak_this](<#/doc/memory/enable_shared_from_this>)_` ﻿.expired() no código acima garante que `_[weak_this](<#/doc/memory/enable_shared_from_this>)_` não seja reatribuído se já indicar um proprietário. Este teste é exigido a partir do C++17.

As sobrecargas de ponteiro bruto assumem a propriedade do objeto apontado. Portanto, construir um `shared_ptr` usando a sobrecarga de ponteiro bruto para um objeto que já é gerenciado por um `shared_ptr`, como por shared_ptr(ptr.get()), provavelmente levará a comportamento indefinido, mesmo que o objeto seja de um tipo derivado de [std::enable_shared_from_this](<#/doc/memory/enable_shared_from_this>).

Como o construtor padrão é `constexpr`, shared_ptrs estáticos são inicializados como parte da [inicialização estática não local](<#/doc/language/initialization>), antes que qualquer inicialização dinâmica não local comece. Isso torna seguro usar um shared_ptr em um construtor de qualquer objeto estático.

Em C++11 e C++14 é válido construir um [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt; a partir de um [std::unique_ptr](<#/doc/memory/unique_ptr>)<T[]>:
```cpp
    std::unique_ptr<int[]> arr(new int[1]);
    std::shared_ptr<int> ptr(std::move(arr));
```

Como o `shared_ptr` obtém seu deleter (um objeto [std::default_delete](<#/doc/memory/default_delete>)<T[]>) do [std::unique_ptr](<#/doc/memory/unique_ptr>), o array será desalocado corretamente.

Isso não é mais permitido em C++17. Em vez disso, a forma de array [std::shared_ptr](<#/doc/memory/shared_ptr>)<T[]> deve ser usada.

### Example

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    
    struct Foo
    {
        int id{0};
        Foo(int i = 0) : id{i} { std::cout << "Foo::Foo(" << i <<  ")\n"; }
        ~Foo() { std::cout << "Foo::~Foo(), id=" << id << '\n'; }
    };
    
    struct D
    {
        void operator()(Foo* p) const
        {
            std::cout << "Call delete from function object. Foo::id=" << p->id << '\n';
            delete p;
        }
    };
    
    int main()
    {
        {
            std::cout << "1) constructor with no managed object\n";
            std::shared_ptr<Foo> sh1;
        }
    
        {
            std::cout << "2) constructor with object\n";
            std::shared_ptr<Foo> sh2(new Foo{10});
            std::cout << "sh2.use_count(): " << sh2.use_count() << '\n';
            std::shared_ptr<Foo> sh3(sh2);
            std::cout << "sh2.use_count(): " << sh2.use_count() << '\n';
            std::cout << "sh3.use_count(): " << sh3.use_count() << '\n';
        }
    
        {
            std::cout << "3) constructor with object and deleter\n";
            std::shared_ptr<Foo> sh4(new Foo{11}, D());
            std::shared_ptr<Foo> sh5(new Foo{12}, 
            {
                std::cout << "Call delete from lambda... p->id=" << p->id << '\n';
                delete p;
            });
        }
    }
```

Saída:
```
    1) constructor with no managed object
    2) constructor with object
    Foo::Foo(10)
    sh2.use_count(): 1
    sh2.use_count(): 2
    sh3.use_count(): 2
    Foo::~Foo(), id=10
    3) constructor with object and deleter
    Foo::Foo(11)
    Foo::Foo(12)
    Call delete from lambda... p->id=12
    Foo::~Foo(), id=12
    Call delete from function object. Foo::id=11
    Foo::~Foo(), id=11
```

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3548](<https://cplusplus.github.io/LWG/issue3548>) | C++11 | o construtor de `unique_ptr` construía por cópia o deleter | constrói por movimento em vez disso

### See also

[ make_sharedmake_shared_for_overwrite](<#/doc/memory/shared_ptr/make_shared>)(C++20) | cria um shared pointer que gerencia um novo objeto
(modelo de função)
[ allocate_sharedallocate_shared_for_overwrite](<#/doc/memory/shared_ptr/allocate_shared>)(C++20) | cria um shared pointer que gerencia um novo objeto alocado usando um allocator
(modelo de função)
[ enable_shared_from_this](<#/doc/memory/enable_shared_from_this>)(C++11) | permite que um objeto crie um `shared_ptr` referindo-se a si mesmo
(modelo de classe)