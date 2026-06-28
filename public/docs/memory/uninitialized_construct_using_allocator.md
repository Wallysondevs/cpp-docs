# std::uninitialized_construct_using_allocator

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T, class Alloc, class... Args >
constexpr T* uninitialized_construct_using_allocator( T* p,
const Alloc& alloc,
Args&&... args );
```

Cria um objeto do tipo `T` fornecido por meio de [construção uses-allocator](<#/doc/memory/uses_allocator>) no local de memória não inicializado indicado por `p`.

Equivalente a
```
    return std::apply(
        [&]<class... Xs>(Xs&&...xs)
        {
            return std::construct_at(p, std::forward<Xs>(xs)...);
        },
        std::uses_allocator_construction_args<T>(alloc, std::forward<Args>(args)...));
```

### Parâmetros

- **p** — o local de memória onde o objeto será colocado
- **alloc** — o allocator a ser usado
- **args** — os argumentos a serem passados para o construtor de `T`

### Valor de retorno

Ponteiro para o objeto recém-criado do tipo `T`.

### Exceções

Pode lançar qualquer exceção lançada pelo construtor de `T`, tipicamente incluindo [std::bad_alloc](<#/doc/memory/new/bad_alloc>).

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Ver também

[ uses_allocator](<#/doc/memory/uses_allocator>)(C++11) | verifica se o tipo especificado suporta construção uses-allocator
(modelo de classe)
[ make_obj_using_allocator](<#/doc/memory/make_obj_using_allocator>)(C++20) | cria um objeto do tipo fornecido por meio de construção uses-allocator
(modelo de função)