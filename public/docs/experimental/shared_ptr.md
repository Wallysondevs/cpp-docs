# std::experimental::shared_ptr

Definido no cabeçalho `[<experimental/memory>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/memory&action=edit&redlink=1> "cpp/header/experimental/memory \(page does not exist\)")`

```c
template< class T > class shared_ptr;
```

`std::experimental::shared_ptr` é uma versão modificada de [std::shared_ptr](<#/doc/memory/shared_ptr>) que adiciona suporte para arrays.

### Tipos de membros

Tipo de membro | Definição
---|---
element_type | [std::remove_extent_t](<#/doc/types/remove_extent>)&lt;T&gt;

### Funções membro

[ (construtor)](<#/doc/experimental/shared_ptr/shared_ptr>) | constrói um novo `shared_ptr`
(função membro pública)

##### Observadores

[ get](<#/doc/experimental/shared_ptr/get>) | retorna o ponteiro armazenado
(função membro pública)
[ operator*operator->](<#/doc/experimental/shared_ptr/operator_star_>) | desreferencia o ponteiro armazenado
(função membro pública)
[ operator[]](<#/doc/experimental/shared_ptr/operator_at>) | fornece acesso por índice ao array
(função membro pública)

### Funções não-membro

[ static_pointer_castdynamic_pointer_castconst_pointer_castreinterpret_pointer_cast](<#/doc/experimental/shared_ptr/pointer_cast>) | aplica [`static_cast`](<#/doc/language/static_cast>), [`dynamic_cast`](<#/doc/language/dynamic_cast>), [`const_cast`](<#/doc/language/const_cast>), ou [`reinterpret_cast`](<#/doc/language/reinterpret_cast>) ao ponteiro armazenado
(modelo de função)

### Classes auxiliares

[ std::hash<std::experimental::shared_ptr>](<#/doc/experimental/shared_ptr/hash>) | suporte a hash para std::experimental::shared_ptr
(especialização de modelo de classe)

## Membros e não-membros idênticos a std::shared_ptr

### Funções membro

As seguintes funções membro funcionam com `std::experimental::shared_ptr` em vez de [std::shared_ptr](<#/doc/memory/shared_ptr>) e `std::experimental::weak_ptr` em vez de [std::weak_ptr](<#/doc/memory/weak_ptr>). O comportamento é idêntico em outros aspectos.

[ (destrutor)](<#/doc/memory/shared_ptr/~shared_ptr>) | destrói o objeto possuído se não houver mais `shared_ptr`s vinculados a ele
(função membro pública de `std::shared_ptr<T>`)
[ operator=](<#/>) | atribui o `shared_ptr`
(função membro pública de `std::shared_ptr<T>`)

##### Modificadores

[ reset](<#/doc/memory/shared_ptr/reset>) | substitui o objeto gerenciado
(função membro pública de `std::shared_ptr<T>`)
[ swap](<#/doc/memory/shared_ptr/swap>) | troca os objetos gerenciados
(função membro pública de `std::shared_ptr<T>`)

##### Observadores

[ use_count](<#/doc/memory/shared_ptr/use_count>) | retorna o número de objetos `shared_ptr` que referenciam o mesmo objeto gerenciado
(função membro pública de `std::shared_ptr<T>`)
[ unique](<#/doc/memory/shared_ptr/unique>)(até C++20) | verifica se o objeto gerenciado é gerenciado apenas pelo objeto `shared_ptr` atual
(função membro pública de `std::shared_ptr<T>`)
[ operator bool](<#/doc/memory/shared_ptr/operator_bool>) | verifica se o ponteiro armazenado não é nulo
(função membro pública de `std::shared_ptr<T>`)
[ owner_before](<#/doc/memory/shared_ptr/owner_before>) | fornece ordenação de shared pointers baseada no proprietário
(função membro pública de `std::shared_ptr<T>`)

### Funções não-membro

Essas funções não-membro são declaradas no namespace `std::experimental` e funcionam com `std::experimental::shared_ptr` em vez de [std::shared_ptr](<#/doc/memory/shared_ptr>), mas se comportam de forma idêntica à função C++14 correspondente em outros aspectos.

[ make_sharedmake_shared_for_overwrite](<#/doc/memory/shared_ptr/make_shared>)(C++20) | cria um shared pointer que gerencia um novo objeto
(modelo de função)
[ allocate_sharedallocate_shared_for_overwrite](<#/doc/memory/shared_ptr/allocate_shared>)(C++20) | cria um shared pointer que gerencia um novo objeto alocado usando um alocador
(modelo de função)
[ get_deleter](<#/doc/memory/shared_ptr/get_deleter>) | retorna o deleter do tipo especificado, se possuído
(modelo de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/memory/shared_ptr/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara com outro `shared_ptr` ou com `nullptr`
(modelo de função)
[ operator<<(std::shared_ptr)](<#/doc/memory/shared_ptr/operator_ltlt>) | envia o valor do ponteiro armazenado para um stream de saída
(modelo de função)
[ std::swap(std::shared_ptr)](<#/doc/memory/shared_ptr/swap2>)(desde C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ std::atomic_is_lock_free(std::shared_ptr)std::atomic_load(std::shared_ptr)std::atomic_load_explicit(std::shared_ptr)std::atomic_store(std::shared_ptr)std::atomic_store_explicit(std::shared_ptr)std::atomic_exchange(std::shared_ptr)std::atomic_exchange_explicit(std::shared_ptr)std::atomic_compare_exchange_weak(std::shared_ptr)std::atomic_compare_exchange_strong(std::shared_ptr)std::atomic_compare_exchange_weak_explicit(std::shared_ptr)std::atomic_compare_exchange_strong_explicit(std::shared_ptr)](<#/doc/memory/shared_ptr/atomic>)(obsoleto desde C++20)(removido em C++26) | especializa operações atômicas para `shared_ptr`
(modelo de função)

### Modelos de classe auxiliares

Esses modelos de classe são declarados no namespace `std::experimental` e funcionam com `std::experimental::shared_ptr` e `std::experimental::weak_ptr` em vez de [std::shared_ptr](<#/doc/memory/shared_ptr>) e [std::weak_ptr](<#/doc/memory/weak_ptr>), mas se comportam de forma idêntica ao modelo de classe C++14 correspondente em outros aspectos.

[ owner_less](<#/doc/memory/owner_less>)(desde C++11) | fornece ordenação de shared e weak pointers baseada no proprietário para tipos mistos
(modelo de classe)
[ enable_shared_from_this](<#/doc/memory/enable_shared_from_this>)(desde C++11) | permite que um objeto crie um `shared_ptr` que se refere a si mesmo
(modelo de classe)

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo