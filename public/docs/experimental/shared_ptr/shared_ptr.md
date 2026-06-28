# std::experimental::shared_ptr&lt;T&gt;::shared_ptr

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
shared_ptr( const shared_ptr<Y>& r, element_type *ptr ) noexcept;  // (8)
shared_ptr( const shared_ptr& r ) noexcept;  // (9)
template< class Y >
shared_ptr( const shared_ptr<Y>& r ) noexcept;  // (9)
shared_ptr( shared_ptr&& r ) noexcept;  // (10)
template< class Y >
shared_ptr( shared_ptr<Y>&& r ) noexcept;  // (10)
template< class Y >
explicit shared_ptr( const std::weak_ptr<Y>& r );  // (11)
template< class Y >
shared_ptr( std::auto_ptr<Y>&& r );  // (12)
template< class Y, class Deleter >
shared_ptr( std::unique_ptr<Y,Deleter>&& r );  // (13)
```

Constrói um novo `shared_ptr` a partir de uma variedade de tipos de ponteiro que se referem a um objeto a ser gerenciado.

Para os propósitos da descrição abaixo, um tipo de ponteiro `Y*` é considerado compatível com um tipo de ponteiro `T*` se `Y*` for conversível para `T*` ou se `Y` for o tipo array `U[N]` e `T` for `U cv []` (onde `cv` é um conjunto de qualificadores `cv`).

1,2) Constrói um `shared_ptr` sem objeto gerenciado, ou seja, um `shared_ptr` vazio.

3-7) Constrói um `shared_ptr` com `ptr` como o ponteiro para o objeto gerenciado. Se `T` for um tipo array `U[N]`, `Y(*)[N]` deve ser conversível para `T*`. Se `T` for um tipo array `U[]`, `Y(*)[]` deve ser conversível para `T*`. Caso contrário, `Y*` deve ser conversível para `T*`. Adicionalmente:

3) Usa uma [expressão delete](<#/doc/language/delete>) (`delete ptr`, se `T` não for um tipo array; `delete[] ptr` se `T` for um tipo array) como o deleter. `Y` deve ser um tipo completo. Essa expressão delete deve ser bem formada, ter comportamento bem definido e não lançar exceções.

4,5) Usa o deleter `d` especificado como o deleter. A expressão `d(ptr)` deve ser bem formada, ter comportamento bem definido e não lançar exceções. `Deleter` deve ser [CopyConstructible](<#/doc/named_req/CopyConstructible>), e seu construtor de cópia e destrutor não devem lançar exceções.

6,7) O mesmo que (4,5), mas adicionalmente usa uma cópia de `alloc` para alocação de dados para uso interno. `Alloc` deve ser um [Allocator](<#/doc/named_req/Allocator>), e seu construtor de cópia e destrutor não devem lançar exceções.

8) O _construtor de aliasing_ : constrói um `shared_ptr` que compartilha informações de propriedade com `r`, mas mantém um ponteiro `ptr` não relacionado e não gerenciado. Mesmo que este `shared_ptr` seja o último do grupo a sair do escopo, ele chamará o destrutor para o objeto originalmente gerenciado por `r`. No entanto, chamar `get()` neste sempre retornará uma cópia de `ptr`. É responsabilidade do programador garantir que este `ptr` permaneça válido enquanto este `shared_ptr` existir, como nos casos de uso típicos onde `ptr` é um membro do objeto gerenciado por `r` ou é um alias (por exemplo, downcast) de `r.get()`.

9) Constrói um `shared_ptr` que compartilha a propriedade do objeto gerenciado por `r`. Se `r` não gerencia nenhum objeto, `*this` também não gerencia nenhum objeto. A sobrecarga de template não participa da resolução de sobrecarga se `Y*` não for _compatível com_ `T*`.

10) Constrói por movimento um `shared_ptr` a partir de `r`. Após a construção, `*this` contém uma cópia do estado anterior de `r`, `r` fica vazio. A sobrecarga de template não participa da resolução de sobrecarga se `Y*` não for _compatível com_ `T*`.

11) Constrói um `shared_ptr` que compartilha a propriedade do objeto gerenciado por `r`. `Y*` deve ser _compatível com_ `T*`. Note que `r.lock()` pode ser usado para o mesmo propósito: a diferença é que este construtor lança uma exceção se o argumento estiver vazio, enquanto `weak_ptr<T>::lock()` constrói um `shared_ptr` vazio nesse caso.

12) Constrói um `shared_ptr` que armazena e possui o objeto anteriormente possuído por `r`. `Y*` deve ser conversível para `T*`. Após a construção, `r` fica vazio.

13) Constrói um `shared_ptr` que gerencia o objeto atualmente gerenciado por `r`. O deleter associado a `r` é armazenado para futura exclusão do objeto gerenciado. `r` não gerencia nenhum objeto após a chamada. Esta sobrecarga não participa da resolução de sobrecarga se `Y*` não for _compatível com_ `T*`.
Se `D` for um tipo de referência, equivalente a `shared_ptr(r.release(), [std::ref](<#/doc/utility/functional/ref>)(r.get_deleter())`. Caso contrário, equivalente a `shared_ptr(r.release(), r.get_deleter())`.

### Notes

Ao construir um `shared_ptr` a partir de um ponteiro bruto para um objeto de um tipo derivado de `std::experimental::enable_shared_from_this`, os construtores de `shared_ptr` atualizam o membro `weak_ptr` privado da base `std::experimental::enable_shared_from_this` para que futuras chamadas a [`shared_from_this()`](<#/doc/memory/enable_shared_from_this/shared_from_this>) compartilhem a propriedade com o `shared_ptr` criado por este construtor de ponteiro bruto.

As sobrecargas de ponteiro bruto assumem a propriedade do objeto apontado, e, portanto, construir um `shared_ptr` usando a sobrecarga de ponteiro bruto para um objeto que já é gerenciado por um `shared_ptr` pode levar a comportamento indefinido, mesmo que o objeto seja de um tipo derivado de `std::experimental::enable_shared_from_this`.

### Parameters

- **ptr** — um ponteiro para um objeto a ser gerenciado
- **d** — um deleter a ser usado para destruir o objeto
- **alloc** — um alocador a ser usado para alocações de dados para uso interno
- **r** — outro smart pointer para compartilhar a propriedade ou adquirir a propriedade de

### Exceptions

3) [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a memória adicional necessária não puder ser obtida. Pode lançar exceção definida pela implementação para outros erros. A expressão delete aplicável (`delete ptr` se `T` não for um tipo array, `delete[] ptr` caso contrário) é chamada se ocorrer uma exceção.

4-7) [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a memória adicional necessária não puder ser obtida. Pode lançar exceção definida pela implementação para outros erros. `d(ptr)` é chamado se ocorrer uma exceção.

11) [std::bad_weak_ptr](<#/doc/memory/bad_weak_ptr>) se `r.expired() == true`. O construtor não tem efeito neste caso.

12) [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a memória adicional necessária não puder ser obtida. Pode lançar exceção definida pela implementação para outros erros. Este construtor não tem efeito se ocorrer uma exceção.

13) Se uma exceção for lançada, o construtor não tem efeitos.

### Example

| Esta seção está incompleta
Razão: nenhum exemplo

### See also

[ make_sharedmake_shared_for_overwrite](<#/doc/memory/shared_ptr/make_shared>)(C++20) | cria um shared pointer que gerencia um novo objeto
(modelo de função)
[ allocate_sharedallocate_shared_for_overwrite](<#/doc/memory/shared_ptr/allocate_shared>)(C++20) | cria um shared pointer que gerencia um novo objeto alocado usando um alocador
(modelo de função)