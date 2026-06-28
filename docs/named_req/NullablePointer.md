# Requisitos nomeados C++: NullablePointer (desde C++11)

Especifica que o tipo é um objeto semelhante a um ponteiro que pode ser comparado a objetos [std::nullptr_t](<#/doc/types/nullptr_t>).

### Requisitos

O tipo deve atender a todos os seguintes requisitos:

  * [EqualityComparable](<#/doc/named_req/EqualityComparable>)
  * [DefaultConstructible](<#/doc/named_req/DefaultConstructible>)
  * [CopyConstructible](<#/doc/named_req/CopyConstructible>)
  * [CopyAssignable](<#/doc/named_req/CopyAssignable>)
  * [Swappable](<#/doc/named_req/Swappable>)
  * [Destructible](<#/doc/named_req/Destructible>)

Além disso, um objeto do tipo inicializado por valor deve produzir um valor nulo desse tipo. Este valor nulo deve ser equivalente apenas a si mesmo. A inicialização padrão do tipo pode ter um valor [indeterminado](<#/doc/language/default_initialization>) ou errôneo (desde C++26).

Um valor do tipo deve ser [contextualmente conversível](<#/doc/language/implicit_cast>) para bool. O efeito desta conversão retorna false se o valor for equivalente ao seu valor nulo e true caso contrário.

Nenhuma das operações que este tipo executa pode lançar exceções.

O tipo deve satisfazer as seguintes expressões adicionais, dados dois valores p e q que são do tipo, e que np é um valor do tipo [std::nullptr_t](<#/doc/types/nullptr_t>) (possivelmente qualificado com const):

```cpp
Declaração  |  Efeitos
Type p(np); Type p = np; |  Depois, p é equivalente a nullptr
Expressão  |  Efeitos
Type(np) |  Um objeto temporário que é equivalente a nullptr
p = np |  Deve retornar um `Type&`, e depois, p é equivalente a nullptr
p != q
|  Tipo e valor atendem aos requisitos BooleanTestable  // (até C++20)
decltype(p != q) models `_boolean-testable_`  // (desde C++20)
```

O efeito é !(p == q)

```cpp
p == np np == p
|  Tipo e valor de ambas as expressões atendem aos requisitos BooleanTestable  // (até C++20)
decltype(p == np) and decltype(np == p) each model `_boolean-testable_`  // (desde C++20)
```

O efeito é (p == Type())

```cpp
p != np np != p
|  Tipo e valor de ambas as expressões atendem aos requisitos BooleanTestable  // (até C++20)
decltype(p != np) and decltype(np != p) each model `_boolean-testable_`  // (desde C++20)
```

O efeito é !(p == np)

### Notas

Observe que a desreferenciação (operator* ou operator->) não é exigida para um tipo NullablePointer. Um tipo minimalista que satisfaz esses requisitos é
```cpp
    class handle
    {
        int id = 0;
    public:
        handle() = default;
        handle(std::nullptr_t) {}
        explicit operator bool() const { return id != 0; }
        friend bool operator==(handle l, handle r) { return l.id == r.id; }
        friend bool operator!=(handle l, handle r) { return !(l == r); }
        // ou apenas um operator== padronizado (desde C++20)
    };
```

### Biblioteca padrão

Os seguintes tipos satisfazem NullablePointer:

  * [std::exception_ptr](<#/doc/error/exception_ptr>).

Os seguintes tipos devem satisfazer NullablePointer para se comunicar com componentes da biblioteca padrão:

  * Os tipos membro `X::pointer`, `X::const_pointer`, `X::void_pointer` e `X::const_void_pointer` de cada tipo [Allocator](<#/doc/named_req/Allocator>) `X`.
  * O tipo membro `pointer` de [std::unique_ptr](<#/doc/memory/unique_ptr>).

  * O tipo de ponteiro adaptado de [`std::inout_ptr_t`](<#/doc/memory/inout_ptr_t>) e [`std::out_ptr_t`](<#/doc/memory/out_ptr_t>).

| (desde C++23)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto
[LWG 2114](<https://cplusplus.github.io/LWG/issue2114>)
([P2167R3](<https://wg21.link/P2167R3>))  | C++11  | a conversibilidade contextual para bool era muito fraca para refletir a expectativa das implementações  | requisitos fortalecidos
  *[_(as is)_]: A::pointer