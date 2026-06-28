# std::valarray&lt;T&gt;::shift

valarray&lt;T&gt; shift( int count ) const;

  
Retorna um novo valarray do mesmo tamanho com elementos cujas posições são deslocadas por count elementos. A nova posição de cada elemento é i−count, onde i é a posição anterior. O valor dos elementos deslocados é T(). 

### Parâmetros

count  |  \-  |  número de posições pelas quais os elementos serão deslocados   
  
### Valor de retorno

O valarray resultante com os elementos deslocados. 

### Observações

A função pode ser implementada com um tipo de retorno diferente de [std::valarray](<#/doc/numeric/valarray>). Neste caso, o tipo de substituição possui as seguintes propriedades: 

    

  * Todas as funções membro const de [std::valarray](<#/doc/numeric/valarray>) são fornecidas. 
  * [std::valarray](<#/doc/numeric/valarray>), [std::slice_array](<#/doc/numeric/valarray/slice_array>), [std::gslice_array](<#/doc/numeric/valarray/gslice_array>), [std::mask_array](<#/doc/numeric/valarray/mask_array>) e [std::indirect_array](<#/doc/numeric/valarray/indirect_array>) podem ser construídos a partir do tipo de substituição. 
  * Para cada função que recebe um const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;&, exceto [`begin()`](<#/doc/numeric/valarray/begin2>) e [`end()`](<#/doc/numeric/valarray/end2>)(desde C++11), funções idênticas que recebem os tipos de substituição devem ser adicionadas; 
  * Para cada função que recebe dois argumentos const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;&, funções idênticas que recebem cada combinação de const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;& e tipos de substituição devem ser adicionadas. 
  * O tipo de retorno não adiciona mais de dois níveis de aninhamento de template sobre o tipo de argumento mais profundamente aninhado. 

### Exemplo

Run this code
```
    #include <iostream>
    #include <valarray>
     
    int main()
    {
        std::valarray<int> v{1, 2, 3, 4, 5, 6, 7, 8};
     
        for (auto const& val : v)
            std::cout << val << ' ';
        std::cout << '\n';
     
        std::valarray<int> v2 = v.shift(2);
     
        for (auto const& val : v2)
            std::cout << val << ' ';
        std::cout << '\n';
    }
```

Saída: 
```
    1 2 3 4 5 6 7 8 
    3 4 5 6 7 8 0 0
```

### Veja também

[ cshift](<#/doc/numeric/valarray/cshift>) |  deslocamento circular dos elementos do valarray   
(função membro pública)  