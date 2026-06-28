# std::experimental::weak_ptr

Definido no cabeçalho `[<experimental/memory>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/memory&action=edit&redlink=1> "cpp/header/experimental/memory \(page does not exist\)")`

```c
template< class T > class weak_ptr;
```

`std::experimental::weak_ptr` é uma versão modificada de [std::weak_ptr](<#/doc/memory/weak_ptr>) que interopera com std::experimental::shared_ptr e tem suporte para arrays.

### Tipos de membros

Tipo de membro | Definição
---|---
element_type | [std::remove_extent_t](<#/doc/types/remove_extent>)&lt;T&gt;

### Funções membro

[ (construtor)](<#/doc/experimental/weak_ptr/weak_ptr>) | constrói um novo `weak_ptr`
(função membro pública)

## Membros e não-membros idênticos a std::weak_ptr

### Funções membro

As seguintes funções membro funcionam com std::experimental::shared_ptr em vez de [std::shared_ptr](<#/doc/memory/shared_ptr>) e std::experimental::weak_ptr em vez de [std::weak_ptr](<#/doc/memory/weak_ptr>). O comportamento é idêntico em outros aspectos.

[ (destrutor)](<#/doc/memory/weak_ptr/~weak_ptr>) | destrói um `weak_ptr`
(função membro pública de `std::weak_ptr<T>`)
[ operator=](<#/>) | atribui o `weak_ptr`
(função membro pública de `std::weak_ptr<T>`)

##### Modificadores

[ reset](<#/doc/memory/weak_ptr/reset>) | libera a posse do objeto gerenciado
(função membro pública de `std::weak_ptr<T>`)
[ swap](<#/doc/memory/weak_ptr/swap>) | troca os objetos gerenciados
(função membro pública de `std::weak_ptr<T>`)

##### Observadores

[ use_count](<#/doc/memory/weak_ptr/use_count>) | retorna o número de objetos `shared_ptr` que gerenciam o objeto
(função membro pública de `std::weak_ptr<T>`)
[ expired](<#/doc/memory/weak_ptr/expired>) | verifica se o objeto referenciado já foi excluído
(função membro pública de `std::weak_ptr<T>`)
[ lock](<#/doc/memory/weak_ptr/lock>) | cria um `shared_ptr` que gerencia o objeto referenciado
(função membro pública de `std::weak_ptr<T>`)
[ owner_before](<#/doc/memory/weak_ptr/owner_before>) | fornece ordenação de weak pointers baseada no proprietário
(função membro pública de `std::weak_ptr<T>`)

### Funções não-membro

Esta função não-membro é declarada no namespace `std::experimental` e funciona com `std::experimental::weak_ptr` em vez de [std::weak_ptr](<#/doc/memory/weak_ptr>), mas, de outra forma, comporta-se de forma idêntica à função C++14 correspondente.

[ std::swap(std::weak_ptr)](<#/doc/memory/weak_ptr/swap2>)(desde C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo