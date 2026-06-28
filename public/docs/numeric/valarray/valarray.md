# std::valarray&lt;T&gt;::valarray

```cpp
valarray();  // (1)
explicit valarray( std::size_t count );  // (2)
valarray( const T& val, std::size_t count );  // (3)
valarray( const T* vals, std::size_t count );  // (4)
valarray( const valarray& other );  // (5)
valarray( valarray&& other ) noexcept;  // (6) (desde C++11)
valarray( const std::slice_array<T>& sa );  // (7)
valarray( const std::gslice_array<T>& gsa );  // (8)
valarray( const std::mask_array<T>& ma );  // (9)
valarray( const std::indirect_array<T>& ia );  // (10)
valarray( std::initializer_list<T> il );  // (11) (desde C++11)
```

  
Constrói um novo array numérico a partir de várias fontes.

1) Construtor padrão. Constrói um array numérico vazio.

2) Constrói um array numérico com count cópias de elementos [value-initialized](<#/doc/language/value_initialization>).

3) Constrói um array numérico com count cópias de val.

4) Constrói um array numérico com cópias de count valores de um array apontado por vals. Se este array contiver menos de count valores, o comportamento é indefinido.

5) Construtor de cópia. Constrói o array numérico com a cópia do conteúdo de other.

6) Construtor de movimento. Constrói o container com o conteúdo de other usando move semantics.

7-10) [Construtor de conversão](<#/doc/language/converting_constructor>). Converte a estrutura de dados correspondente para um `valarray`.

11) Constrói o array numérico com o conteúdo da initializer list il.

### Parâmetros

count  |  \-  |  o número de elementos a serem construídos   
---|---|---
val  |  \-  |  o valor para inicializar os elementos   
vals  |  \-  |  ponteiro para um array C a ser usado como fonte para inicializar o conteúdo   
other  |  \-  |  outro array numérico a ser usado como fonte para inicializar o conteúdo   
sa  |  \-  |  slice array para inicializar os elementos   
gsa  |  \-  |  generic slice array para inicializar os elementos   
ma  |  \-  |  mask array para inicializar os elementos   
ia  |  \-  |  indirect array para inicializar os elementos   
il  |  \-  |  initializer list para inicializar os elementos   
  
### Exceções

1-5, 7-11) Pode lançar exceções definidas pela implementação.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   