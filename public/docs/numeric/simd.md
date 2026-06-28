# Tipos data-paralelos (SIMD) (desde C++26)

A biblioteca fornece tipos data-paralelos e operações sobre esses tipos: tipos portáteis para declarar explicitamente o paralelismo de dados e estruturar dados através de recursos de execução data-paralelos onde disponíveis, como registradores e instruções [SIMD](<https://en.wikipedia.org/wiki/Single_instruction,_multiple_data> "enwiki:Single instruction, multiple data") ou unidades de execução que são acionadas por um decodificador de instrução comum.

Todos os tipos inteiros padrão, tipos de caractere e a maioria dos tipos de ponto flutuante são _tipos vetorizáveis_. Tipos de ponto flutuante vetorizáveis incluem float, double e os tipos de ponto flutuante estendidos selecionados [std::float16_t](<#/doc/types/floating-point>), [std::float32_t](<#/doc/types/floating-point>) e [std::float64_t](<#/doc/types/floating-point>), se definidos.

Um _tipo data-paralelo_ consiste em um ou mais elementos de um tipo vetorizável subjacente, chamado _tipo de elemento_. O número de elementos, chamado _largura_, é constante para cada tipo data-paralelo.

O tipo data-paralelo refere-se a todas as especializações habilitadas dos class templates `basic_simd` e `basic_simd_mask`.

Um _objeto data-paralelo_ de tipo data-paralelo se comporta analogamente a objetos do tipo `T`. Mas enquanto `T` armazena e manipula um único valor, o tipo data-paralelo com o tipo de elemento `T` armazena e manipula múltiplos valores.

Cada operação em um objeto data-paralelo age _elemento a elemento_ (exceto por operações horizontais, como reduções, que são claramente marcadas como tal) aplicando-se a cada elemento do objeto ou a elementos correspondentes de dois objetos. Cada aplicação é não sequenciada em relação às outras. Esta regra simples expressa o paralelismo de dados e será usada pelo compilador para gerar instruções SIMD e/ou fluxos de execução independentes.

Todas as operações (exceto sobrecargas de funções matemáticas não-constexpr) em objetos data-paralelos são constexpr: é possível criar e usar objetos data-paralelos na avaliação de uma expressão constante.

Os alias templates `simd` e `simd_mask` são definidos para permitir que os usuários especifiquem a largura para um determinado tamanho. A largura padrão é determinada pela implementação em tempo de compilação.

Definido no header `[<simd>](<#/doc/header/simd>)`
---

### Classes principais

[ basic_simd](<#/doc/numeric/simd/basic_simd>)(C++26) | tipo de vetor data-paralelo
(class template)
[ simd](<#/doc/numeric/simd/basic_simd>)(C++26) | alias template de conveniência para `basic_simd` que pode especificar sua largura
(alias template)
[ basic_simd_mask](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/basic_simd_mask&action=edit&redlink=1> "cpp/numeric/simd/basic simd mask \(page does not exist\)")(C++26) | tipo data-paralelo com o tipo de elemento bool
(class template)
[ simd_mask](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/basic_simd_mask&action=edit&redlink=1> "cpp/numeric/simd/basic simd mask \(page does not exist\)")(C++26) | alias template de conveniência para `basic_simd_mask` que pode especificar sua largura
(alias template)

### Flags de carregamento e armazenamento

[ simd_flags](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/simd_flags&action=edit&redlink=1> "cpp/numeric/simd/simd flags \(page does not exist\)")(C++26) | flags de carregamento e armazenamento para tipos data-paralelos
(class template)
[ simd_flag_default](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/simd_flags&action=edit&redlink=1> "cpp/numeric/simd/simd flags \(page does not exist\)")(C++26) | flag padrão usada em operações de carregamento e armazenamento
(constant)
[ simd_flag_convert](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/simd_flags&action=edit&redlink=1> "cpp/numeric/simd/simd flags \(page does not exist\)")(C++26) | flag que habilita conversões que não preservam o valor em operações de carregamento e armazenamento
(constant)
[ simd_flag_aligned](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/simd_flags&action=edit&redlink=1> "cpp/numeric/simd/simd flags \(page does not exist\)")(C++26) | flag indicando o alinhamento do endereço de carregamento-armazenamento para algum armazenamento especificado ao valor de `simd_alignment`
(constant)
[ simd_flag_overaligned](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/simd_flags&action=edit&redlink=1> "cpp/numeric/simd/simd flags \(page does not exist\)")(C++26) | flag indicando o alinhamento do endereço de carregamento-armazenamento para algum armazenamento especificado ao alinhamento especificado
(variable template)

### Operações de carregamento e armazenamento

[ simd_unchecked_loadsimd_partial_load](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/simd_load&action=edit&redlink=1> "cpp/numeric/simd/simd load \(page does not exist\)")(C++26) | carrega elementos de um range contíguo para `basic_simd`
(function template)
[ simd_unchecked_storesimd_partial_store](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/simd_store&action=edit&redlink=1> "cpp/numeric/simd/simd store \(page does not exist\)")(C++26) | armazena elementos de `basic_simd` para um range contíguo
(function template)

### Casts

[ simd_split](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/simd_split&action=edit&redlink=1> "cpp/numeric/simd/simd split \(page does not exist\)")(C++26) | divide um único objeto data-paralelo em múltiplos
(function template)
[ simd_cat](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/simd_cat&action=edit&redlink=1> "cpp/numeric/simd/simd cat \(page does not exist\)")(C++26) | concatena múltiplos objetos data-paralelos em um único
(function template)

### Algoritmos

[ minmaxminmax](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/min_max&action=edit&redlink=1> "cpp/numeric/simd/min max \(page does not exist\)")(C++26) | operações min/max elemento a elemento para `basic_simd`
(function template)
[ clamp](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/clamp&action=edit&redlink=1> "cpp/numeric/simd/clamp \(page does not exist\)")(C++26) | operação clamp elemento a elemento para `basic_simd`
(function template)
[ simd_select](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/simd_select&action=edit&redlink=1> "cpp/numeric/simd/simd select \(page does not exist\)")(C++26) | seleção elemento a elemento usando operador condicional
(function template)

### Reduções

[ reducereduce_minreduce_max](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/reduce&action=edit&redlink=1> "cpp/numeric/simd/reduce \(page does not exist\)")(C++26) | reduz todos os valores em `basic_simd` sobre uma operação binária especificada para um único valor
(function template)
[ all_ofany_ofnone_of](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/all_any_none_of&action=edit&redlink=1> "cpp/numeric/simd/all any none of \(page does not exist\)")(C++26) | reduções de `basic_simd_mask` para bool
(function template)
[ reduce_count](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/reduce_count&action=edit&redlink=1> "cpp/numeric/simd/reduce count \(page does not exist\)")(C++26) | redução de `basic_simd_mask` para o número de valores verdadeiros
(function template)
[ reduce_min_indexreduce_max_index](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/reduce_min_max_index&action=edit&redlink=1> "cpp/numeric/simd/reduce min max index \(page does not exist\)")(C++26) | reduções de `basic_simd_mask` para o índice do primeiro ou último valor verdadeiro
(function template)

### Traits

[ simd_alignment](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/simd_alignment&action=edit&redlink=1> "cpp/numeric/simd/simd alignment \(page does not exist\)")(C++26) | obtém um alinhamento apropriado para `simd_flag_aligned`
(class template)
[ rebind_simd](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/rebind_simd&action=edit&redlink=1> "cpp/numeric/simd/rebind simd \(page does not exist\)")(C++26) | altera o tipo de elemento do tipo data-paralelo
(class template)
[ resize_simd](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/resize_simd&action=edit&redlink=1> "cpp/numeric/simd/resize simd \(page does not exist\)")(C++26) | altera a largura do tipo data-paralelo
(class template)

### Funções matemáticas

Todas as funções em [`<cmath>`](<#/doc/header/cmath>) são sobrecarregadas para `basic_simd`.

| Esta seção está incompleta
Razão: descrição

### Detalhes de implementação

#### ABI tags

Os tipos data-paralelos `basic_simd` e `basic_simd_mask` estão associados a _ABI tags_. Essas tags são tipos que especificam o tamanho e a representação binária de objetos data-paralelos. O design pretende que o tamanho e a representação binária variem com base na arquitetura de destino e nas flags do compilador. A ABI tag, juntamente com o tipo de elemento, determina a largura.

A ABI tag permanece independente da seleção do conjunto de instruções da máquina. O conjunto de instruções da máquina escolhido limita os tipos de ABI tag utilizáveis. As ABI tags permitem que os usuários passem com segurança objetos de tipo data-paralelo através dos limites das unidades de tradução.

| Esta seção está incompleta

#### Entidades apenas para exposição

```cpp
using /*simd-size-type*/ = /* see description */;  // (1) (apenas para exposição*)
template< std::size_t Bytes >
using /*integer-from*/ = /* see description */;  // (2) (apenas para exposição*)
template< class T, class Abi >
constexpr /*simd-size-type*/ /*simd-size-v*/ = /* see description */;  // (3) (apenas para exposição*)
template< class T >
constexpr std::size_t /*mask-element-size*/ = /* see description */;  // (4) (apenas para exposição*)
template< class T >
concept /*constexpr-wrapper-like*/ = /* see description */;  // (5) (apenas para exposição*)
template< class T >
using /*deduced-simd-t*/ = /* see description */;  // (6) (apenas para exposição*)
template< class V, class T >
using /*make-compatible-simd-t*/ = /* see description */;  // (7) (apenas para exposição*)
```

1) /*simd-size-type*/ é um alias para um tipo inteiro assinado. A implementação é livre para escolher qualquer tipo inteiro assinado.

2) /*integer-from*/&lt;Bytes&gt; é um alias para um tipo inteiro assinado `T` tal que sizeof(T) é igual a Bytes.

3) /*simd-size-v*/<T, Abi> denota a largura da especialização habilitada `basic_simd<T, Abi>`, ou ​0​ caso contrário.

4) Se `T` denota std::basic_simd_mask<Bytes, Abi>, /*mask-element-size*/&lt;T&gt; é igual a Bytes.

5) O concept /*constexpr-wrapper-like*/ é definido como:
```cpp
    template< class T >
    concept /*constexpr-wrapper-like*/ =
        std::convertible_to<T, decltype(T::value)> &&
        std::equality_comparable_with<T, decltype(T::value)> &&
        std::bool_constant<T() == T::value>::value &&
        std::bool_constant<static_cast<decltype(T::value)>(T()) == T::value>::value;
```

6) Seja x um lvalue do tipo const T. /*deduced-simd-t*/&lt;T&gt; é um alias equivalente a:

  * decltype(x + x), se o tipo de x + x for uma especialização habilitada de `basic_simd`; caso contrário
  * void.

7) Seja x um lvalue do tipo const T. /*make-compatible-simd-t*/<V, T> é um alias equivalente a:

  * /*deduced-simd-t*/&lt;T&gt;, se esse tipo não for void, caso contrário
  * std::simd<decltype(x + x), V​::​size()>.

```cpp
Requisitos de funções matemáticas
template< class V >
concept /*simd-floating-point*/ = /* see description */;  // (8) (apenas para exposição*)
template< class... Ts >
concept /*math-floating-point*/ = /* see description */;  // (9) (apenas para exposição*)
template< class... Ts >
requires /*math-floating-point*/<Ts...>
using /*math-common-simd-t*/ = /* see description */;  // (10) (apenas para exposição*)
template< class BinaryOp, class T >
concept /*reduction-binary-operation*/ = /* see description */;  // (11) (apenas para exposição*)
```

8) O concept /*simd-floating-point*/ é definido como:
```cpp
    template< class V >
    concept /*simd-floating-point*/ =
        std::same_as<V, std::basic_simd<typename V::value_type, typename V::abi_type>> &&
        std::is_default_constructible_v<V> &&
        std::floating_point<typename V::value_type>;
```

9) O concept /*math-floating-point*/ é definido como:
```cpp
    template< class... Ts >
    concept /*math-floating-point*/ =
        (/*simd-floating-point*/</*deduced-simd-t*/<Ts>> || ...);
```

10) Seja `T0` denotando Ts...[0], `T1` denotando Ts...[1], e `TRest` denotando um pack tal que T0, T1, TRest... é equivalente a Ts.... Então, /*math-common-simd-t*/<Ts...> é um alias equivalente a:

  * /*deduced-simd-t*/&lt;T0&gt;, se sizeof...(Ts) == 1 for verdadeiro
  * caso contrário, [std::common_type_t](<#/doc/types/common_type>)</*deduced-simd-t*/&lt;T0&gt;, /*deduced-simd-t*/&lt;T1&gt;>, se sizeof...(Ts) == 2 for verdadeiro e /*math-floating-point*/&lt;T0&gt; && /*math-floating-point*/&lt;T1&gt; for verdadeiro,
  * caso contrário, [std::common_type_t](<#/doc/types/common_type>)</*deduced-simd-t*/&lt;T0&gt;, T1> se sizeof...(Ts) == 2 for verdadeiro e /*math-floating-point*/&lt;T0&gt; for verdadeiro,
  * caso contrário, [std::common_type_t](<#/doc/types/common_type>)<T0, /*deduced-simd-t*/&lt;T1&gt;> se sizeof...(Ts) == 2 for verdadeiro,
  * caso contrário, [std::common_type_t](<#/doc/types/common_type>)</*math-common-simd-t*/<T0, T1>, TRest...>, se /*math-common-simd-t*/<T0, T1> for um tipo válido,
  * caso contrário, [std::common_type_t](<#/doc/types/common_type>)</*math-common-simd-t*/<TRest...>, T0, T1>.

11) O concept /*reduction-binary-operation*/ é definido como:
```cpp
    template< class BinaryOp, class T >
    concept /*reduction-binary-operation*/ =
        requires (const BinaryOp binary_op, const std::simd<T, 1> v) {
            { binary_op(v, v) } -> std::same_as<std::simd<T, 1>>;
        };
```

/*reduction-binary-operation*/<BinaryOp, T> é modelado apenas se:

  * `BinaryOp` for uma operação binária elemento a elemento que é comutativa, e
  * Um objeto do tipo `BinaryOp` for invocável com dois argumentos do tipo std::basic_simd<T, Abi> para uma ABI tag `Abi` não especificada que retorna um std::basic_simd<T, Abi>.

```cpp
SIMD ABI tags
template< class T >
using /*native-abi*/ = /* see description */;  // (12) (apenas para exposição*)
template< class T, /*simd-size-type*/ N >
using /*deduce-abi-t*/ = /* see description */;  // (13) (apenas para exposição*)
```

12) /*native-abi*/&lt;T&gt; é um alias definido pela implementação para uma ABI tag. Esta é a ABI tag primária a ser usada para vetorização explícita eficiente. Como resultado, basic_simd<T, /*native-abi*/&lt;T&gt;> é uma especialização habilitada.

13) /*deduce-abi-t*/<T, N> é um alias que nomeia um tipo de ABI tag tal que:

  * /*simd-size-v*/<T, /*deduce-abi-t*/<T, N>> é igual a N,
  * std::basic_simd<T, /*deduce-abi-t*/<T, N>> é uma especialização habilitada, e
  * std::basic_simd_mask<sizeof(T), /*deduce-abi-t*/</*integer-from*/<sizeof(T)>, N>> é uma especialização habilitada.

É definido apenas se `T` for um tipo vetorizável, e N > 0 && N <= M for verdadeiro, onde M é um máximo definido pela implementação que é pelo menos 64 e pode diferir dependendo de `T`.

```cpp
Flags de carregamento e armazenamento
struct /*convert-flag*/;  // (14) (apenas para exposição*)
struct /*aligned-flag*/;  // (15) (apenas para exposição*)
template< std::size_t N >
struct /*overaligned-flag*/;  // (16) (apenas para exposição*)
```

14-16) Esses tipos de tag são usados como um argumento de template de `std::simd_flags`. Veja [flags de carregamento e armazenamento](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/simd_flags&action=edit&redlink=1> "cpp/numeric/simd/simd flags \(page does not exist\)") para seus usos correspondentes.

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_simd`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | Tipos e operações data-paralelos

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <simd>
    #include <string_view>
    
    void println(std::string_view name, auto const& a)
    {
        std::cout << name << ": ";
        for (std::size_t i{}; i != a.size(); ++i)
            std::cout << a[i] << ' ';
        std::cout << '\n';
    }
    
    template<class A>
    constexpr std::basic_simd<int, A> my_abs(std::basic_simd<int, A> x)
    {
        return std::simd_select(x < 0, -x, x);
    }
    
    int main()
    {
        constexpr std::simd<int> a = 1;
        println("a", a);
    
        constexpr std::simd<int> b( { return i - 2; });
        println("b", b);
    
        constexpr auto c = a + b;
        println("c", c);
    
        constexpr auto d = my_abs(c);
        println("d", d);
    
        constexpr auto e = d * d;
        println("e", e);
    
        constexpr auto inner_product = std::reduce(e);
        std::cout << "inner product: " << inner_product << '\n';
    
        constexpr std::simd<double, 16> x( { return i; });
        println("x", x);
        // overloaded math functions are defined in <simd>
        println("cos²(x) + sin²(x)", std::pow(std::cos(x), 2) + std::pow(std::sin(x), 2));
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

[ valarray](<#/doc/numeric/valarray>) | arrays numéricos, máscaras de array e fatias de array
(class template)

### Links externos

1. | [A implementação da Seção 9 "Data-Parallel Types" da ISO/IEC TS 19570:2018](<https://github.com/VcDevel/std-simd>) — github.com
---|---
2. | Alcance da implementação TS para [GCC/libstdc++](<https://gcc.gnu.org/git/?p=gcc.git;a=blob;f=libstdc%2B%2B-v3/include/experimental/simd;hb=HEAD>) (`std::experimental::simd` está sendo distribuído com GCC-11) — gcc.gnu.org