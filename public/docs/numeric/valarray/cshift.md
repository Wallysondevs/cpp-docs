# std::valarray&lt;T&gt;::cshift

valarray&lt;T&gt; cshift( int count ) const;

  
Retorna um novo valarray do mesmo tamanho com elementos cujas posições são deslocadas circularmente por `count` elementos.

Um valor não negativo de `count` desloca os elementos circularmente para a esquerda em `count` posições e um valor negativo de `count` desloca os elementos circularmente para a direita em `-count` posições.

### Parâmetros

count  |  \-  |  número de posições para deslocar os elementos   
  
### Valor de retorno

O valarray resultante com elementos deslocados circularmente.

### Notas

A função pode ser implementada com um tipo de retorno diferente de [std::valarray](<#/doc/numeric/valarray>). Neste caso, o tipo de substituição possui as seguintes propriedades:

*   Todas as funções membro `const` de [std::valarray](<#/doc/numeric/valarray>) são fornecidas.
*   [std::valarray](<#/doc/numeric/valarray>), [std::slice_array](<#/doc/numeric/valarray/slice_array>), [std::gslice_array](<#/doc/numeric/valarray/gslice_array>), [std::mask_array](<#/doc/numeric/valarray/mask_array>) e [std::indirect_array](<#/doc/numeric/valarray/indirect_array>) podem ser construídos a partir do tipo de substituição.
*   Para cada função que recebe um `const [std::valarray](<#/doc/numeric/valarray>)<T>&`, exceto [`begin()`](<#/doc/numeric/valarray/begin2>) e [`end()`](<#/doc/numeric/valarray/end2>) (desde C++11), funções idênticas que recebem os tipos de substituição devem ser adicionadas;
*   Para cada função que recebe dois argumentos `const [std::valarray](<#/doc/numeric/valarray>)<T>&`, funções idênticas que recebem cada combinação de `const [std::valarray](<#/doc/numeric/valarray>)<T>&` e tipos de substituição devem ser adicionadas.
*   O tipo de retorno não adiciona mais de dois níveis de aninhamento de template sobre o tipo de argumento mais profundamente aninhado.

### Exemplo

Run this code
```cpp
    #include <iostream>
    #include <valarray>
    
    int main()
    {
        std::valarray<int> v{1, 2, 3, 4, 5, 6, 7, 8};
    
        for (auto const& val : v)
            std::cout << val << ' ';
        std::cout << '\n';
    
        std::valarray<int> v2 = v.cshift(2);
    
        for (auto const& val : v2)
            std::cout << val << ' ';
        std::cout << '\n';
    }
```

Output: 
```
    1 2 3 4 5 6 7 8 
    3 4 5 6 7 8 1 2
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 618](<https://cplusplus.github.io/LWG/issue618>) | C++98  | a expressão dos elementos deslocados  
contém divisão por zero se [`size()`](<#/doc/numeric/valarray/size>) for ​0​ | descreve as novas posições  
sem usar expressões   
  
### Veja também

[ shift](<#/doc/numeric/valarray/shift>) |  desloca os elementos do valarray preenchendo com zeros   
(função membro pública)  