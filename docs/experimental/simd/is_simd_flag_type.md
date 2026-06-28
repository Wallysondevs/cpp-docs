# std::experimental::is_simd_flag_type

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< class T >
struct is_simd_flag_type;
```

Se T é um tipo válido para o segundo argumento de `copy_from`, `copy_to` ou dos construtores de carregamento correspondentes de `simd` ou `simd_mask`, fornece a constante membro value igual a true. Para qualquer outro tipo, value é false.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

template< class T >
constexpr bool is_simd_flag_type_v = is_simd_flag_type&lt;T&gt;::value; | | (parallelism TS v2)

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se T é um tipo de tag de flag de carregamento/armazenamento, false caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Exemplo

Execute este código
```cpp
    #include <experimental/simd>
    #include <iostream>
    
    int main()
    {
        namespace stdx = std::experimental;
        std::cout << std::boolalpha
                  << stdx::is_simd_flag_type_v<stdx::element_aligned_tag> << '\n'
                  << stdx::is_simd_flag_type_v<int> << '\n';
    }
```

Saída:
```
    true
    false
```

### Veja também

[ is_abi_tag](<#/doc/experimental/simd/is_abi_tag>)(parallelism TS v2) | verifica se um tipo é um tipo de tag ABI
(template de classe)