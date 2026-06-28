# Biblioteca SIMD

A biblioteca SIMD fornece tipos portáveis para declarar explicitamente paralelismo de dados e estruturar dados para acesso SIMD mais eficiente.

Um objeto do tipo [`simd<T>`](<#/doc/experimental/simd/simd>) se comporta de forma análoga a objetos do tipo `T`. Mas enquanto `T` armazena e manipula um valor, `simd<T>` armazena e manipula múltiplos valores (chamados de _largura_, mas identificados como tamanho para consistência com o restante da standard library; cf. [`simd_size`](<#/doc/experimental/simd/simd_size>)).

Cada operador e operação em `simd<T>` age _elemento a elemento_ (exceto por operações _horizontais_, que são claramente marcadas como tal). Esta regra simples expressa paralelismo de dados e será usada pelo compilador para gerar instruções SIMD e/ou fluxos de execução independentes.

A largura dos tipos `simd<T>` e [`native_simd<T>`](<#/doc/experimental/simd/simd>) é determinada pela implementação em tempo de compilação. Em contraste, a largura do tipo [`fixed_size_simd<T, N>`](<#/doc/experimental/simd/simd>) é fixada pelo desenvolvedor para um determinado tamanho.

Um padrão recomendado para usar uma mistura de diferentes tipos SIMD com alta eficiência utiliza [`native_simd`](<#/doc/experimental/simd/simd>) e [`rebind_simd`](<#/doc/experimental/simd/rebind_simd>):
```cpp
    #include <experimental/simd>
    namespace stdx = std::experimental;
    
    using floatv  = stdx::native_simd<float>;
    using doublev = stdx::rebind_simd_t<double, floatv>;
    using intv    = stdx::rebind_simd_t<int, floatv>;
```

Isso garante que o conjunto de tipos tenha a mesma largura e, portanto, possa ser interconvertido. Uma conversão com largura incompatível não é definida porque ela descartaria valores ou teria que inventar valores. Para operações de redimensionamento, a biblioteca SIMD fornece as funções [`split`](<#/doc/experimental/simd/split>) e [`concat`](<#/doc/experimental/simd/concat>).

Definido no header `[<experimental/simd>](<#/doc/header/experimental/simd>)`
---

### Classes Principais

```cpp
 simd(parallelism TS v2) | tipo de vetor data-parallel
(class template)
 simd_mask(parallelism TS v2) | tipo data-parallel com o tipo de elemento bool
(class template)
```

### Tags ABI

Definido no namespace `std::experimental::simd_abi`
---
```cpp
 scalar(parallelism TS v2) | tipo de tag para armazenar um único elemento
(typedef)
 fixed_size(parallelism TS v2) | tipo de tag para armazenar um número especificado de elementos
(alias template)
 compatible(parallelism TS v2) | tipo de tag que garante compatibilidade ABI
(alias template)
 native(parallelism TS v2) | tipo de tag que é mais eficiente
(alias template)
 max_fixed_size(parallelism TS v2) | o número máximo de elementos garantidos para serem suportados por fixed
(constant)
 deducededuce_t(parallelism TS v2) | obtém um tipo ABI para um dado tipo de elemento e número de elementos
(class template)
```

### Tags de Alinhamento

```cpp
 element_aligned_tagelement_aligned(parallelism TS v2) | flag indicando o alinhamento do endereço de carga/armazenamento ao alinhamento do elemento
(class)
 vector_aligned_tagvector_aligned(parallelism TS v2) | flag indicando o alinhamento do endereço de carga/armazenamento ao alinhamento do vetor
(class)
 overaligned_tagoveraligned(parallelism TS v2) | flag indicando o alinhamento do endereço de carga/armazenamento ao alinhamento especificado
(class template)
```

### Expressão where

```cpp
 const_where_expression(parallelism TS v2) | elementos selecionados com operações não mutáveis
(class template)
 where_expression(parallelism TS v2) | elementos selecionados com operações mutáveis
(class template)
 where(parallelism TS v2) | produz const_where_expression e where_expression
(function template)
```

### Conversões (Casts)

[ simd_caststatic_simd_cast](<#/doc/experimental/simd/simd_cast>)(parallelism TS v2) | static_cast elemento a elemento
---|---
(function template) |
[ to_fixed_sizeto_compatibleto_native](<#/doc/experimental/simd/abi_cast>)(parallelism TS v2) | conversão ABI elemento a elemento
(function template) |
[ splitsplit_by](<#/doc/experimental/simd/split>)(parallelism TS v2) | divide um único objeto simd em múltiplos
(function template) |
[ concat](<#/doc/experimental/simd/concat>)(parallelism TS v2) | concatena múltiplos objetos simd em um único
(function template) |

### Algoritmos

[ min](<#/doc/experimental/simd/min>)(parallelism TS v2) | operação min elemento a elemento
---|---
(function template) |
[ max](<#/doc/experimental/simd/max>)(parallelism TS v2) | operação max elemento a elemento
(function template) |
[ minmax](<#/doc/experimental/simd/minmax>)(parallelism TS v2) | operação minmax elemento a elemento
(function template) |
[ clamp](<#/doc/experimental/simd/clamp>)(parallelism TS v2) | operação clamp elemento a elemento
(function template) |

### Redução

[ reducehminhmax](<#/doc/experimental/simd/reduce>)(parallelism TS v2) | reduz o vetor a um único elemento
---|---
(function template) |

### Redução de Máscara

[ all_ofany_ofnone_ofsome_of](<#/doc/experimental/simd/all_of>)(parallelism TS v2) | reduções de [`simd_mask`](<#/doc/experimental/simd/simd_mask>) para bool
---|---
(function template) |
[ popcount](<#/doc/experimental/simd/popcount>)(parallelism TS v2) | redução de [`simd_mask`](<#/doc/experimental/simd/simd_mask>) para o número de valores true
(function template) |
[ find_first_setfind_last_set](<#/doc/experimental/simd/find_first_set>)(parallelism TS v2) | reduções de [`simd_mask`](<#/doc/experimental/simd/simd_mask>) para o índice do primeiro ou último valor true
(function template) |

### Traits

```cpp
 is_simdis_simd_mask(parallelism TS v2) | verifica se um tipo é um tipo `simd` ou `simd_mask`
(class template)
 is_abi_tag(parallelism TS v2) | verifica se um tipo é um tipo de tag ABI
(class template)
 is_simd_flag_type(parallelism TS v2) | verifica se um tipo é um tipo de flag simd
(class template)
 simd_size(parallelism TS v2) | obtém o número de elementos de um dado tipo de elemento e tag ABI
(class template)
 memory_alignment(parallelism TS v2) | obtém um alinhamento apropriado para `vector_aligned`
(class template)
 rebind_simdresize_simd(parallelism TS v2) | muda o tipo de elemento ou o número de elementos de `simd` ou `simd_mask`
(class template)
```

### Funções Matemáticas

Todas as funções em [`<cmath>`](<#/doc/header/cmath>), exceto pelas funções matemáticas especiais, são sobrecarregadas para `simd`.

### Exemplo

Execute este código
```cpp
    #include <experimental/simd>
    #include <iostream>
    #include <string_view>
    namespace stdx = std::experimental;
    
    void println(std::string_view name, auto const& a)
    {
        std::cout << name << ": ";
        for (std::size_t i{}; i != std::size(a); ++i)
            std::cout << a[i] << ' ';
        std::cout << '\n';
    }
    
    template<class A>
    stdx::simd<int, A> my_abs(stdx::simd<int, A> x)
    {
        where(x < 0, x) = -x;
        return x;
    }
    
    int main()
    {
        const stdx::native_simd<int> a = 1;
        println("a", a);
    
        const stdx::native_simd<int> b( { return i - 2; });
        println("b", b);
    
        const auto c = a + b;
        println("c", c);
    
        const auto d = my_abs(c);
        println("d", d);
    
        const auto e = d * d;
        println("e", e);
    
        const auto inner_product = stdx::reduce(e);
        std::cout << "inner product: " << inner_product << '\n';
    
        const stdx::fixed_size_simd<long double, 16> x( { return i; });
        println("x", x);
        println("cos²(x) + sin²(x)", stdx::pow(stdx::cos(x), 2) + stdx::pow(stdx::sin(x), 2));
    }
```

Saída:
```
    a: 1 1 1 1 
    b: -2 -1 0 1 
    c: -1 0 1 2 
    d: 1 0 1 2 
    e: 1 0 1 4 
    inner product: 6
    x: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 
    cos²(x) + sin²(x): 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
```

### Veja também

```cpp
 valarray | arrays numéricos, máscaras de array e fatias de array
(class template)
```

### Links externos

1\. | [A implementação da ISO/IEC TS 19570:2018 Seção 9 "Tipos Data-Parallel"](<https://github.com/VcDevel/std-simd>) — github.com
---|---
2\. | Alcance da implementação TS para [GCC/libstdc++](<https://gcc.gnu.org/git/?p=gcc.git;a=blob;f=libstdc%2B%2B-v3/include/experimental/simd;hb=HEAD>) (`std::experimental::simd` está sendo distribuído com GCC-11) — gcc.gnu.org