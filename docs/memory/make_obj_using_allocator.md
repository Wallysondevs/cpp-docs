# std::make_obj_using_allocator

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T, class Alloc, class... Args >
constexpr T make_obj_using_allocator( const Alloc& alloc, Args&&... args );
```

Cria um objeto do tipo `T` fornecido por meio de [construção com uso de alocador](<#/doc/memory/uses_allocator>).

Equivalente a
```cpp
    return std::make_from_tuple<T>(
        std::uses_allocator_construction_args<T>(alloc, std::forward<Args>(args)...)
    );
```

### Parâmetros

- **alloc** — o alocador a ser usado
- **args** — os argumentos a serem passados para o construtor de T

### Valor de retorno

O objeto recém-criado do tipo `T`.

### Exceções

Pode lançar qualquer exceção lançada pelo construtor de `T`, tipicamente incluindo [std::bad_alloc](<#/doc/memory/new/bad_alloc>).

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ uses_allocator_construction_args](<#/doc/memory/uses_allocator_construction_args>)(C++20) | prepara a lista de argumentos que corresponde ao tipo de construção com uso de alocador exigido pelo tipo fornecido
(modelo de função)
[ uninitialized_construct_using_allocator](<#/doc/memory/uninitialized_construct_using_allocator>)(C++20) | cria um objeto do tipo fornecido em um local de memória especificado por meio de construção com uso de alocador
(modelo de função)