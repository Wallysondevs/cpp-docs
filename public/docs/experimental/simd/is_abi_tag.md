# std::experimental::is_abi_tag

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< class T >
struct is_abi_tag;
```

Se T for uma ABI tag no namespace `simd_abi`, fornece a constante membro `value` igual a `true`. Para qualquer outro tipo, `value` é `false`.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

template< class T >
constexpr bool is_abi_tag_v = is_abi_tag&lt;T&gt;::value; | | (parallelism TS v2)

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se T for um tipo de ABI tag, false caso contrário
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
```
    #include <experimental/simd>
    
    static_assert(std::experimental::is_abi_tag_v<stdx::simd_abi::scalar>);
    static_assert(!std::experimental::is_abi_tag_v<int>);
    
    int main() {}
```

### Veja também

[ is_simd_flag_type](<#/doc/experimental/simd/is_simd_flag_type>)(parallelism TS v2) | verifica se um tipo é um tipo de simd flag
(template de classe)