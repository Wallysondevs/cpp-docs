# std::complex

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
class complex;
template<> class complex<float>;
template<> class complex<double>;
template<> class complex<long double>;
```

Especializações de `std::complex` para [tipos de ponto flutuante](<#/doc/language/types>) padrão (até C++23) não qualificados por cv são [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) (desde C++23) [LiteralTypes](<#/doc/named_req/LiteralType>) para representar e manipular [números complexos](<https://en.wikipedia.org/wiki/complex_number> "enwiki:complex number").

### Parâmetros de template

- **T** — o tipo das partes real e imaginária. O comportamento é não especificado (e pode falhar na compilação) se `T` não for um tipo de ponto flutuante padrão (até C++23) não qualificado por cv e indefinido se `T` não for um [NumericType](<#/doc/named_req/NumericType>).

### Tipos de membro

Tipo de membro | Definição
---|---
`value_type` | `T`

### Funções membro

[ (constructor)](<#/doc/numeric/complex/complex>) | constrói um número complexo
(função membro pública)
[ operator=](<#/>) | atribui o conteúdo
(função membro pública)
[ real](<#/doc/numeric/complex/real>) | acessa a parte real do número complexo
(função membro pública)
[ imag](<#/doc/numeric/complex/imag>) | acessa a parte imaginária do número complexo
(função membro pública)
[ operator+=operator-=operator*=operator/=](<#/doc/numeric/complex/operator_arith>) | atribuição composta de dois números complexos ou um complexo e um escalar
(função membro pública)

### Funções não-membro

[ operator+operator-](<#/doc/numeric/complex/operator_arith2>) | aplica operadores unários a números complexos
(modelo de função)
[ operator+operator-operator*operator/](<#/doc/numeric/complex/operator_arith3>) | realiza aritmética de números complexos em dois valores complexos ou um complexo e um escalar
(modelo de função)
[ operator==operator!=](<#/doc/numeric/complex/operator_cmp>)(removido em C++20) | compara dois números complexos ou um complexo e um escalar
(modelo de função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/complex/operator_ltltgtgt>) | serializa e desserializa um número complexo
(modelo de função)
[ get(std::complex)](<#/doc/numeric/complex/get>)(C++26) | obtém uma referência à parte real ou imaginária de um **std::complex**
(modelo de função)
[ real](<#/doc/numeric/complex/real2>) | retorna a parte real
(modelo de função)
[ imag](<#/doc/numeric/complex/imag2>) | retorna a parte imaginária
(modelo de função)
[ abs(std::complex)](<#/doc/numeric/complex/abs>) | retorna a magnitude de um número complexo
(modelo de função)
[ arg](<#/doc/numeric/complex/arg>) | retorna o ângulo de fase
(modelo de função)
[ norm](<#/doc/numeric/complex/norm>) | retorna a magnitude ao quadrado
(modelo de função)
[ conj](<#/doc/numeric/complex/conj>) | retorna o conjugado complexo
(modelo de função)
[ proj](<#/doc/numeric/complex/proj>)(C++11) | retorna a projeção na esfera de Riemann
(modelo de função)
[ polar](<#/doc/numeric/complex/polar>) | constrói um número complexo a partir da magnitude e do ângulo de fase
(modelo de função)

##### Funções exponenciais

[ exp(std::complex)](<#/doc/numeric/complex/exp>) | exponencial complexa de base _e_
(modelo de função)
[ log(std::complex)](<#/doc/numeric/complex/log>) | logaritmo natural complexo com os cortes de ramo ao longo do eixo real negativo
(modelo de função)
[ log10(std::complex)](<#/doc/numeric/complex/log10>) | logaritmo comum complexo com os cortes de ramo ao longo do eixo real negativo
(modelo de função)

##### Funções de potência

[ pow(std::complex)](<#/doc/numeric/complex/pow>) | potência complexa, um ou ambos os argumentos podem ser um número complexo
(modelo de função)
[ sqrt(std::complex)](<#/doc/numeric/complex/sqrt>) | raiz quadrada complexa no intervalo do semiplano direito
(modelo de função)

##### Funções trigonométricas

[ sin(std::complex)](<#/doc/numeric/complex/sin>) | calcula o seno de um número complexo (\\({\small\sin{z}}\\)sin(z))
(modelo de função)
[ cos(std::complex)](<#/doc/numeric/complex/cos>) | calcula o cosseno de um número complexo (\\({\small\cos{z}}\\)cos(z))
(modelo de função)
[ tan(std::complex)](<#/doc/numeric/complex/tan>) | calcula a tangente de um número complexo (\\({\small\tan{z}}\\)tan(z))
(modelo de função)
[ asin(std::complex)](<#/doc/numeric/complex/asin>)(C++11) | calcula o arco seno de um número complexo (\\({\small\arcsin{z}}\\)arcsin(z))
(modelo de função)
[ acos(std::complex)](<#/doc/numeric/complex/acos>)(C++11) | calcula o arco cosseno de um número complexo (\\({\small\arccos{z}}\\)arccos(z))
(modelo de função)
[ atan(std::complex)](<#/doc/numeric/complex/atan>)(C++11) | calcula o arco tangente de um número complexo (\\({\small\arctan{z}}\\)arctan(z))
(modelo de função)

##### Funções hiperbólicas

[ sinh(std::complex)](<#/doc/numeric/complex/sinh>) | calcula o seno hiperbólico de um número complexo (\\({\small\sinh{z}}\\)sinh(z))
(modelo de função)
[ cosh(std::complex)](<#/doc/numeric/complex/cosh>) | calcula o cosseno hiperbólico de um número complexo (\\({\small\cosh{z}}\\)cosh(z))
(modelo de função)
[ tanh(std::complex)](<#/doc/numeric/complex/tanh>) | calcula a tangente hiperbólica de um número complexo (\\({\small\tanh{z}}\\)tanh(z))
(modelo de função)
[ asinh(std::complex)](<#/doc/numeric/complex/asinh>)(C++11) | calcula o seno hiperbólico inverso de um número complexo (\\({\small\operatorname{arsinh}{z}}\\)arsinh(z))
(modelo de função)
[ acosh(std::complex)](<#/doc/numeric/complex/acosh>)(C++11) | calcula o cosseno hiperbólico inverso de um número complexo (\\({\small\operatorname{arcosh}{z}}\\)arcosh(z))
(modelo de função)
[ atanh(std::complex)](<#/doc/numeric/complex/atanh>)(C++11) | calcula a tangente hiperbólica inversa de um número complexo (\\({\small\operatorname{artanh}{z}}\\)artanh(z))
(modelo de função)

### Tipos auxiliares

[ std::tuple_size<std::complex>](<#/doc/numeric/complex/tuple_size>)(C++26) | obtém o tamanho de um **std::complex**
(especialização de modelo de classe)
[ std::tuple_element<std::complex>](<#/doc/numeric/complex/tuple_element>)(C++26) | obtém o tipo de número real e imaginário subjacente de um **std::complex**
(especialização de modelo de classe)

### Acesso orientado a array

Para qualquer objeto z do tipo `std::complex<T>`, reinterpret_cast<T(&)[2]>(z)[0] é a parte real de z e reinterpret_cast<T(&)[2]>(z)[1] é a parte imaginária de z.

Para qualquer ponteiro para um elemento de um array de `std::complex<T>` chamado p e qualquer índice de array válido i, reinterpret_cast<T*>(p)[2 * i] é a parte real do número complexo p[i], e reinterpret_cast<T*>(p)[2 * i + 1] é a parte imaginária do número complexo p[i].

A intenção deste requisito é preservar a compatibilidade binária entre os tipos de números complexos da biblioteca C++ e os [tipos de números complexos da linguagem C](<#/>) (e arrays deles), que possuem um requisito idêntico de representação de objeto.

### Notas de implementação

Para satisfazer os requisitos de acesso orientado a array, uma implementação é restrita a armazenar as partes real e imaginária de uma especialização de `std::complex` em locais de memória separados e adjacentes. Declarações possíveis para seus membros de dados não estáticos incluem:

  * um array do tipo `value_type[2]`, com o primeiro elemento contendo a parte real e o segundo elemento contendo a parte imaginária (por exemplo, Microsoft Visual Studio);
  * um único membro do tipo `value_type _Complex` (encapsulando o [tipo de número complexo da linguagem C](<#/>) correspondente) (por exemplo, GNU libstdc++);
  * dois membros do tipo `value_type`, com o mesmo acesso de membro, contendo as partes real e imaginária, respectivamente (por exemplo, LLVM libc++).

Uma implementação não pode declarar membros de dados não estáticos adicionais que ocupariam armazenamento disjunto das partes real e imaginária, e deve garantir que a especialização do modelo de classe não contenha nenhum [bit de preenchimento](<#/doc/language/objects>). A implementação também deve garantir que as otimizações de acesso a array considerem a possibilidade de que um ponteiro para `value_type` possa estar fazendo alias para uma especialização de `std::complex` ou um array dela.

### Literais

Definido no namespace inline `std::literals::complex_literals`
---
[ operator""ifoperator""ioperator""il](<#/doc/numeric/complex/operator_q__q_i>)(C++14) | um literal **std::complex** representando um número puramente imaginário
(função)

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_constexpr_complex`](<#/doc/feature_test>) | [`201711L`](<#/>) | (C++20) | funções matemáticas complexas simples constexpr em [`<complex>`](<#/doc/header/complex>)
[`202306L`](<#/>) | (C++26) | Mais constexpr para [`<complex>`](<#/doc/header/complex>)
[`__cpp_lib_tuple_like`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Adiciona protocolo de tupla a `std::complex`

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <complex>
    #include <iomanip>
    #include <iostream>
    #include <ranges>
    
    int main()
    {
        using namespace std::complex_literals;
        std::cout << std::fixed << std::setprecision(1);
    
        std::complex<double> z1 = 1i * 1i; // imaginary unit squared
        std::cout << "i * i = " << z1 << '\n';
    
        std::complex<double> z2 = std::pow(1i, 2); // imaginary unit squared
        std::cout << "pow(i, 2) = " << z2 << '\n';
    
        const double PI = std::acos(-1); // or std::numbers::pi in C++20
        std::complex<double> z3 = std::exp(1i * PI); // Euler's formula
        std::cout << "exp(i * pi) = " << z3 << '\n';
    
        std::complex<double> z4 = 1.0 + 2i, z5 = 1.0 - 2i; // conjugates
        std::cout << "(1 + 2i) * (1 - 2i) = " << z4 * z5 << '\n';
    
        const auto zz = {0.0 + 1i, 2.0 + 3i, 4.0 + 5i};
    #if __cpp_lib_tuple_like >= 202311L
        for (double re : zz | std::views::keys)
            std::cout << re << ' ';
        std::cout << '\n';
        for (double im : zz | std::views::values)
            std::cout << im << ' ';
        std::cout << '\n';
    #else
        for (double re : zz | std::views::transform({ return z.real(); }))
            std::cout << re << ' ';
        std::cout << '\n';
        for (double im : zz | std::views::transform({ return z.imag(); }))
            std::cout << im << ' ';
        std::cout << '\n';
    #endif
    }
```

Saída:
```
    i * i = (-1.0,0.0)
    pow(i, 2) = (-1.0,0.0)
    exp(i * pi) = (-1.0,0.0)
    (1 + 2i) * (1 - 2i) = (5.0,0.0)
    0.0 2.0 4.0
    1.0 3.0 5.0
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 387](<https://cplusplus.github.io/LWG/issue387>) | C++98 | `std::complex` não tinha garantia de ser compatível com C `complex` | garantia de ser compatível

### Veja também

[Documentação C](<#/>) para aritmética de números complexos
---