# std::experimental::function

Definido no cabeçalho `[<experimental/functional>](<#/doc/header/experimental/functional>)`

```c
template< class >
class function; /* indefinido */
template< class R, class... Args >
class function<R(Args...)>
```

`std::experimental::function` é uma versão modificada de [std::function](<#/doc/utility/functional/function>) com suporte para allocators com type-erasure.

### Tipos Membro

Tipo | Definição
`allocator_type` | | [std::experimental::erased_type](<#/doc/experimental/erased_type>) | (library fundamentals TS)
(até library fundamentals TS v3)
[std::pmr::polymorphic_allocator](<#/doc/memory/polymorphic_allocator>)<> | (library fundamentals TS v3)

### Funções Membro

[ (construtor)](<#/doc/experimental/function/function>) | constrói uma nova instância de `std::experimental::function`
(função membro pública)
[ operator=](<#/>) | atribui um novo alvo
(função membro pública)
[ swap](<#/doc/experimental/function/swap>) | troca os conteúdos
(função membro pública)
[ get_memory_resource](<#/doc/experimental/function/get_memory_resource>)(removido na library fundamentals TS v3) | recupera um ponteiro para o recurso de memória usado por este objeto para alocar memória
(função membro pública)
[ get_allocator](<#/doc/experimental/function/get_allocator>)(library fundamentals TS v3) | recupera um [std::pmr::polymorphic_allocator](<#/doc/memory/polymorphic_allocator>) com type-erasure usado por este objeto para alocar memória
(função membro pública)

### Funções Não-Membro

[ std::experimental::swap(std::experimental::function)](<#/doc/experimental/function/swap2>) | especializa o algoritmo `swap`
(modelo de função)
[ operator==operator!=](<#/doc/experimental/function/operator_cmp>)(removido na library fundamentals TS v3) | compara um std::experimental::function com nullptr
(modelo de função)

### Classes Auxiliares

[ std::uses_allocator<std::experimental::function>](<#/doc/experimental/function/uses_allocator>)(removido na library fundamentals TS v3) | especializa o trait de tipo [std::uses_allocator](<#/doc/memory/uses_allocator>)
(especialização de modelo de classe)

## Membros idênticos a std::function

### Tipos Membro

Tipo | Definição
---|---
`result_type` | `R`

##### Tipos Membro removidos na Library Fundamental TS v3

`argument_type` | `T` se sizeof...(Args) == 1 e `T` é o primeiro e único tipo em `Args...`
---|---
`first_argument_type` | `T1` se sizeof...(Args) == 2 e `T1` é o primeiro dos dois tipos em `Args...`
`second_argument_type` | `T2` se sizeof...(Args) == 2 e `T2` é o segundo dos dois tipos em `Args...`
Os tipos membro `argument_type`, `first_argument_type` e `second_argument_type` são removidos, porque os tipos membro correspondentes de [std::function](<#/doc/utility/functional/function>) são removidos em C++20. | (library fundamentals TS v3)

### Funções Membro

[ (destrutor)](<#/doc/utility/functional/function/~function>) | destrói uma instância de `std::function`
(função membro pública de `std::function<R(Args...)>`)
[ operator bool](<#/doc/utility/functional/function/operator_bool>) | verifica se um alvo está contido
(função membro pública de `std::function<R(Args...)>`)
[ operator()](<#/>) | invoca o alvo
(função membro pública de `std::function<R(Args...)>`)

##### Acesso ao Alvo

[ target_type](<#/doc/utility/functional/function/target_type>) | obtém o typeid do alvo armazenado
(função membro pública de `std::function<R(Args...)>`)
[ target](<#/doc/utility/functional/function/target>) | obtém um ponteiro para o alvo armazenado
(função membro pública de `std::function<R(Args...)>`)