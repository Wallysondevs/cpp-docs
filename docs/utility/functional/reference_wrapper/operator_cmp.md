# operator==, &lt;=&gt;(std::reference_wrapper)

```cpp
friend constexpr bool
operator==( reference_wrapper lhs, reference_wrapper rhs );  // (1) (desde C++26)
friend constexpr bool
operator==( reference_wrapper lhs, reference_wrapper<const T> rhs );  // (2) (desde C++26)
friend constexpr bool
operator==( reference_wrapper lhs, const T& ref );  // (3) (desde C++26)
friend constexpr auto
operator<=>( reference_wrapper lhs, reference_wrapper rhs );  // (4) (desde C++26)
friend constexpr auto
operator<=>( reference_wrapper lhs, reference_wrapper<const T> rhs );  // (5) (desde C++26)
friend constexpr auto
operator<=>( reference_wrapper lhs, const T& ref );  // (6) (desde C++26)
```

  
Realiza operações de comparação em objetos `reference_wrapper`.

1,2) Compara dois objetos `reference_wrapper`. Os objetos são considerados iguais se e somente se lhs.get() e rhs.get() forem iguais.

1) Esta sobrecarga participa da resolução de sobrecarga somente se a expressão lhs.get() == rhs.get() for bem-formada e seu resultado for conversível para bool.

2) Esta sobrecarga participa da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: 

  * [std::is_const_v](<#/doc/types/is_const>)&lt;T&gt; é falso. 
  * A expressão lhs.get() == rhs.get() for bem-formada e seu resultado for conversível para bool.

3) Compara um objeto `reference_wrapper` com uma referência. Os parâmetros são considerados iguais se e somente se lhs.get() for igual a ref.

Esta sobrecarga participa da resolução de sobrecarga somente se a expressão lhs.get() == ref for bem-formada e seu resultado for conversível para bool.

4,5) Compara dois objetos `reference_wrapper` usando [`_synth-three-way_`](<#/doc/standard_library/synth-three-way>).

4) Esta sobrecarga participa da resolução de sobrecarga somente se a expressão [`_synth-three-way_`](<#/doc/standard_library/synth-three-way>)(lhs.get(), rhs.get()) for bem-formada.

5) Esta sobrecarga participa da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: 

  * [std::is_const_v](<#/doc/types/is_const>)&lt;T&gt; é falso. 
  * A expressão [`_synth-three-way_`](<#/doc/standard_library/synth-three-way>)(lhs.get(), rhs.get()) for bem-formada.

6) Compara um objeto `reference_wrapper` com uma referência usando [`_synth-three-way_`](<#/doc/standard_library/synth-three-way>).

Esta sobrecarga participa da resolução de sobrecarga somente se a expressão [`_synth-three-way_`](<#/doc/standard_library/synth-three-way>)(lhs.get(), ref) for bem-formada.

Os operadores `<`, `<=`, `>`, `>=`, e `!=` são [sintetizados](<#/doc/language/operators>) a partir de operator<=> e operator==, respectivamente. 

### Parâmetros

lhs, rhs  |  \-  |  Objeto `reference_wrapper` para comparar   
---|---|---
ref  |  \-  |  Referência para comparar com o objeto `reference_wrapper`   
  
### Valor de retorno

1,2) lhs.get() == rhs.get().

3) lhs.get() == ref.

4,5) [`_synth-three-way_`](<#/doc/standard_library/synth-three-way>)(lhs.get(), rhs.get()).

6) [`_synth-three-way_`](<#/doc/standard_library/synth-three-way>)(lhs.get(), ref).

### Exceções

Lança exceções quando e o que a comparação lança. 

### Observações

Os tipos de retorno de operator<=> são [deduzidos](<#/doc/language/template_argument_deduction>) a partir das declarações de retorno para evitar um erro grave ao instanciar um [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>)&lt;T&gt; com [`_synth-three-way-result_`](<#/doc/standard_library/synth-three-way>)&lt;T&gt; sendo mal-formado. 

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_reference_wrapper`](<#/doc/feature_test>) | [`202403L`](<#/>) | (C++26) | Comparações para `std::reference_wrapper`  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   