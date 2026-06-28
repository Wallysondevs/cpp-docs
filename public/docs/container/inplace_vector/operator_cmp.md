# operator==,&lt;=&gt;(std::inplace_vector)

```cpp
constexpr friend bool operator==( const std::inplace_vector<T, N>& lhs,
const std::inplace_vector<T, N>& rhs );  // (1) (desde C++26)
constexpr friend synth-three-way-result<T>
operator<=>( const std::inplace_vector<T, N>& lhs,
const std::inplace_vector<T, N>& rhs );  // (2) (desde C++26)
```

  
Compara o conteúdo de dois std::inplace_vectors.

1) Verifica se o conteúdo de lhs e rhs é igual, ou seja, se eles têm o mesmo número de elementos e cada elemento em lhs se compara como igual ao elemento em rhs na mesma posição.

2) Compara o conteúdo de lhs e rhs lexicograficamente. A comparação é realizada como se fosse por meio da chamada  
[std::lexicographical_compare_three_way](<#/doc/algorithm/lexicographical_compare_three_way>)(lhs.begin(), lhs.end(),  
rhs.begin(), rhs.end(), synth-three-way);.

O tipo de retorno é o tipo de retorno de [`_synth-three-way_`](<#/doc/standard_library/synth-three-way>) (ou seja, [`_synth-three-way-result_`](<#/doc/standard_library/synth-three-way>) ﻿&lt;T&gt;).

Pelo menos uma das seguintes condições deve ser satisfeita:

  * `T` modela [`three_way_comparable`](<#/doc/utility/compare/three_way_comparable>).
  * `<` é definido para valores do tipo `T` (possivelmente qualificado com const), e `<` é uma relação de ordenação total.

Caso contrário, o comportamento é indefinido.

Os operadores `<`, `<=`, `>`, `>=`, e `!=` são [sintetizados](<#/doc/language/operators>) a partir de operator<=> e operator==, respectivamente.

### Parâmetros

lhs, rhs  |  \-  |  std::inplace_vectors cujo conteúdo será comparado   
-`T` deve atender aos requisitos de [EqualityComparable](<#/doc/named_req/EqualityComparable>) para usar as sobrecargas (1).   
  
### Valor de retorno

1) true se o conteúdo dos std::inplace_vectors for igual, false caso contrário.

2) A ordem relativa do primeiro par de elementos não equivalentes em lhs e rhs, se houver tais elementos; lhs.size() <=> rhs.size() caso contrário.

### Complexidade

1) Constante se lhs e rhs tiverem tamanhos diferentes, caso contrário, linear no tamanho do std::inplace_vector.

2) Linear no tamanho do std::inplace_vector.

### Observações

Os operadores relacionais são definidos em termos de [`_synth-three-way_`](<#/doc/standard_library/synth-three-way>), que usa operator<=> se possível, ou operator< caso contrário.

Notavelmente, se o elemento não fornecer operator<=> por si só, mas for implicitamente conversível para um tipo comparável de três vias, essa conversão será usada em vez de operator<.

### Exemplo

Execute este código
```
    #include <inplace_vector>
     
    int main()
    {
        constexpr std::inplace_vector<int, 4>
            a{1, 2, 3},
            b{1, 2, 3},
            c{7, 8, 9, 10};
     
        static_assert
        (""
            "Comparar containers iguais:" &&
            (a != b) == false &&
            (a == b) == true &&
            (a < b) == false &&
            (a <= b) == true &&
            (a > b) == false &&
            (a >= b) == true &&
            (a <=> b) >= 0 &&
            (a <=> b) <= 0 &&
            (a <=> b) == 0 &&
     
            "Comparar containers diferentes:" &&
            (a != c) == true &&
            (a == c) == false &&
            (a < c) == true &&
            (a <= c) == true &&
            (a > c) == false &&
            (a >= c) == false &&
            (a <=> c) < 0 &&
            (a <=> c) != 0 &&
            (a <=> c) <= 0 &&
        "");
    }
```