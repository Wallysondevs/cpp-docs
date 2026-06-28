# std::unary_negate

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class Predicate >
struct unary_negate : public std::unary_function<Predicate::argument_type, bool>;
template< class Predicate >
struct unary_negate;
(obsoleto desde C++17)
(removido em C++20)
```

`std::unary_negate` é um objeto de função wrapper que retorna o complemento do predicado unário que ele contém.

O tipo de predicado unário deve definir um tipo membro, `argument_type`, que seja conversível para o tipo de parâmetro do predicado. Os objetos de função unária obtidos de `[std::ref](<#/doc/utility/functional/ref>)`, `[std::cref](<#/doc/utility/functional/ref>)`, `[std::negate](<#/doc/utility/functional/negate>)`, `[std::logical_not](<#/doc/utility/functional/logical_not>)`, `[std::mem_fn](<#/doc/utility/functional/mem_fn>)`, `[std::function](<#/doc/utility/functional/function>)`, `[std::hash](<#/doc/utility/hash>)`, ou de outra chamada para `[std::not1](<#/doc/utility/functional/not1>)` têm este tipo definido, assim como os objetos de função derivados do obsoleto `[std::unary_function](<#/doc/utility/functional/unary_function>)`.

Objetos `std::unary_negate` são facilmente construídos com a função auxiliar `[std::not1](<#/doc/utility/functional/not1>)`.

### Tipos Membro

Tipo | Definição
---|---
`argument_type` | Predicate::argument_type
`result_type` | bool

### Funções Membro

(construtor) | constrói um novo objeto unary_negate com o predicado fornecido
(função membro pública)
operator() | retorna o complemento lógico do resultado de uma chamada ao predicado armazenado
(função membro pública)

## std::unary_negate::unary_negate

```cpp
explicit unary_negate( Predicate const& pred );  // (até C++14)
constexpr explicit unary_negate( Predicate const& pred );  // (desde C++14)
```

Constrói um objeto de função `std::unary_negate` com o predicado `pred` armazenado.

### Parâmetros

- **pred** — objeto de função predicado

## std::unary_negate::operator()

```cpp
bool operator()( argument_type const& x ) const;  // (até C++14)
constexpr bool operator()( argument_type const& x ) const;  // (desde C++14)
```

Retorna o complemento lógico do resultado da chamada a `pred(x)`.

### Parâmetros

- **x** — argumento a ser passado para o predicado

### Valor de retorno

O complemento lógico do resultado da chamada a `pred(x)`.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <functional>
    #include <iostream>
    #include <vector>
    
    struct less_than_7 : std::unary_function<int, bool>
    {
        bool operator()(int i) const { return i < 7; }
    };
    
    int main()
    {
        std::vector<int> v(7, 7);
        v[0] = v[1] = v[2] = 6;
    
        std::unary_negate<less_than_7> not_less_than_7((less_than_7()));
        // C++11 solution:
        // Use std::function<bool (int)>
        // std::function<bool (int)> not_less_than_7 =
        //     ->bool { return !less_than_7()(x); };
    
        std::cout << std::count_if(v.begin(), v.end(), not_less_than_7);
    }
```

Saída:
```
    4
```

### Veja também

[ binary_negate](<#/doc/utility/functional/binary_negate>)(obsoleto desde C++17)(removido em C++20) | objeto de função wrapper que retorna o complemento do predicado binário que ele contém
(modelo de classe)
[ function](<#/doc/utility/functional/function>)(C++11) | wrapper copiável de qualquer objeto chamável copiável
(modelo de classe)
[ move_only_function](<#/doc/utility/functional/move_only_function>)(C++23) | wrapper somente-movível de qualquer objeto chamável que suporte qualificadores em uma dada assinatura de chamada
(modelo de classe)
[ not1](<#/doc/utility/functional/not1>)(obsoleto desde C++17)(removido em C++20) | constrói um objeto **std::unary_negate** personalizado
(modelo de função)
[ ptr_fun](<#/doc/utility/functional/ptr_fun>)(obsoleto desde C++11)(removido em C++17) | cria um objeto de função wrapper compatível com adaptador a partir de um ponteiro para função
(modelo de função)
[ unary_function](<#/doc/utility/functional/unary_function>)(obsoleto desde C++11)(removido em C++17) | classe base de função unária compatível com adaptador
(modelo de classe)