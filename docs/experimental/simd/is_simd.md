# std::experimental::is_simd, std::experimental::is_simd_mask

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< class T >
struct is_simd;
template< class T >
struct is_simd_mask;
```

1) Se `T` for uma especialização do template de classe [`simd`](<#/doc/experimental/simd/simd>), fornece o valor da constante membro igual a true. Para qualquer outro tipo, o valor é false.

2) Se `T` for uma especialização do template de classe [`simd_mask`](<#/doc/experimental/simd/simd_mask>), fornece o valor da constante membro igual a true. Para qualquer outro tipo, o valor é false.

### Parâmetros de template

- **T** — um tipo para verificar

### Template de variável auxiliar

template< class T >
constexpr bool is_simd_v = is_simd&lt;T&gt;::value; | | (parallelism TS v2)
template< class T >
constexpr bool is_simd_mask_v = is_simd_mask&lt;T&gt;::value; | | (parallelism TS v2)

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` for um tipo [`simd`](<#/doc/experimental/simd/simd>)/[`simd_mask`](<#/doc/experimental/simd/simd_mask>), false caso contrário
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

### Notas

is_simd_v&lt;T&gt; é necessário, mas não suficiente, para testar se `T` pode ser usado como um tipo SIMD. Por exemplo, is_simd_v<simd&lt;bool&gt;> é true, embora bool não esteja incluído nos tipos vetorizáveis permitidos. A condição que falta é [std::is_constructible_v](<#/doc/types/is_constructible>)&lt;T&gt;, que é false para simd&lt;bool&gt;.

### Exemplo

Execute este código
```cpp
    #include <experimental/simd>
    #include <iostream>
    #include <string_view>
    
    namespace stdx = std::experimental;
    
    template<typename T>
    void test_simd(std::string_view type_name)
    {
        std::cout << std::boolalpha
                  << "Type: " << type_name << '\n'
                  << "  is_simd: " << stdx::is_simd_v<T> << '\n'
                  << "  is_constructible: " << std::is_constructible_v<T> << '\n';
    }
    
    template<typename T>
    void test_simd_mask(std::string_view type_name)
    {
        std::cout << std::boolalpha
                  << "Type: " << type_name << '\n'
                  << "  is_simd_mask: " << stdx::is_simd_mask_v<T> << '\n'
                  << "  is_constructible: " << std::is_constructible_v<T> << "\n\n";
    }
    
    int main() 
    {
        test_simd<int>("int");
        test_simd_mask<int>("int");
    
        test_simd<stdx::simd<float>>("simd<float>");
        test_simd_mask<stdx::simd_mask<float>>("simd_mask<float>");
    
        test_simd<stdx::simd<bool>>("simd<bool>");
        test_simd_mask<stdx::simd_mask<bool>>("simd_mask<bool>");
    }
```

Saída:
```
    Type: int
      is_simd: false
      is_constructible: true
    Type: int
      is_simd_mask: false
      is_constructible: true
    
    Type: simd<float>
      is_simd: true
      is_constructible: true
    Type: simd_mask<float>
      is_simd_mask: true
      is_constructible: true
    
    Type: simd<bool>
      is_simd: true
      is_constructible: false
    Type: simd_mask<bool>
      is_simd_mask: true
      is_constructible: false
```