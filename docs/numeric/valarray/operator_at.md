# std::valarray&lt;T&gt;::operator[]

```cpp
const T& operator pos ) const;  // (1)
T& operator pos );  // (2)
std::valarray<T> operator slicearr ) const;  // (3)
std::slice_array<T> operator slicearr );  // (4)
std::valarray<T> operator& gslicearr ) const;  // (5)
std::gslice_array<T> operator& gslicearr );  // (6)
std::valarray<T> operator<bool>& boolarr ) const;  // (7)
std::mask_array<T> operator<bool>& boolarr );  // (8)
std::valarray<T> operator<std::size_t>& indarr ) const;  // (9)
std::indirect_array<T> operator<std::size_t>& indarr );  // (10)
```

  
Recupera elementos únicos ou porções do array.

As sobrecargas `const` que retornam sequências de elementos criam um novo objeto [std::valarray](<#/doc/numeric/valarray>). As sobrecargas não-`const` retornam classes que contêm referências aos elementos do array.

Os elementos selecionados devem existir:

  * para as sobrecargas (1,2), se `pos` não for menor que [`size()`](<#/doc/numeric/valarray/size>), o comportamento é indefinido; e
  * para as sobrecargas (3-10), se o argumento não especificar um subconjunto válido de `*this`, o comportamento é indefinido.

### Parâmetros

pos  |  \-  |  posição do elemento a ser retornado   
---|---|---
slicearr  |  \-  |  [slice](<#/doc/numeric/valarray/slice>) dos elementos a serem retornados   
gslicearr  |  \-  |  [gslice](<#/doc/numeric/valarray/gslice>) dos elementos a serem retornados   
boolarr  |  \-  |  máscara dos elementos a serem retornados   
indarr  |  \-  |  índices dos elementos a serem retornados   
  
### Valor de retorno

1,2) Uma referência ao elemento correspondente.

3,5,7,9) Um objeto [std::valarray](<#/doc/numeric/valarray>) contendo cópias dos itens selecionados.

4,6,8,10) A estrutura de dados correspondente contendo referências aos itens selecionados.

### Exceções

Pode lançar exceções definidas pela implementação.

### Notas

Para valores [std::valarray](<#/doc/numeric/valarray>) `a`, `b` e valores [std::size_t](<#/doc/types/size_t>) `i`, `j` apropriados, todas as seguintes expressões sempre avaliam como verdadeiro:

1) (a[i] = q, a[i]) == q para `a` não-const

2) &a[i + j] == &a[i] + j

  * Isso significa que os elementos de [std::valarray](<#/doc/numeric/valarray>) são adjacentes na memória.

3) &a[i] != &b[j] para todos os objetos `a` e `b` que não são aliases um do outro

  * Isso significa que não há aliases nos elementos e esta propriedade pode ser usada para realizar alguns tipos de otimização.

Referências tornam-se inválidas em [`resize()`](<#/doc/numeric/valarray/resize>) ou quando o array é destruído.

Para as sobrecargas (3,5,7,9), a função pode ser implementada com um tipo de retorno diferente de [std::valarray](<#/doc/numeric/valarray>). Neste caso, o tipo de substituição possui as seguintes propriedades:

    

  * Todas as funções membro `const` de [std::valarray](<#/doc/numeric/valarray>) são fornecidas.
  * [std::valarray](<#/doc/numeric/valarray>), [std::slice_array](<#/doc/numeric/valarray/slice_array>), [std::gslice_array](<#/doc/numeric/valarray/gslice_array>), [std::mask_array](<#/doc/numeric/valarray/mask_array>) e [std::indirect_array](<#/doc/numeric/valarray/indirect_array>) podem ser construídos a partir do tipo de substituição.
  * Para cada função que recebe um `const std::valarray<T>&`, exceto [`begin()`](<#/doc/numeric/valarray/begin2>) e [`end()`](<#/doc/numeric/valarray/end2>) (desde C++11), funções idênticas que recebem os tipos de substituição devem ser adicionadas;
  * Para cada função que recebe dois argumentos `const std::valarray<T>&`, funções idênticas que recebem cada combinação de `const std::valarray<T>&` e tipos de substituição devem ser adicionadas.
  * O tipo de retorno não adiciona mais de dois níveis de aninhamento de template sobre o tipo de argumento mais profundamente aninhado.

Acessos de índice por slice/máscara/indireto não encadeiam: `v[v == n][std::slice(0, 5, 2)] = x;` é um erro porque [std::mask_array](<#/doc/numeric/valarray/mask_array>) (o tipo de `v[v == n]`) não possui operator[].

### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <iomanip>
    #include <iostream>
    #include <valarray>
    
    int main() 
    {
        std::valarray<int> data = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    
        std::cout << "Initial valarray:   ";
        for (int n : data)
            std::cout << std::setw(3) << n;
        std::cout << '\n';
    
        data[data > 5] = -1; // valarray<bool> overload of operator[]
        // the type of data > 5 is std::valarray<bool>
        // the type of data[data > 5] is std::mask_array<int>
    
        std::cout << "After v[v > 5] = -1:";
        for (std::size_t n = 0; n < data.size(); ++n) 
            std::cout << std::setw(3) << data[n]; // regular operator[]
        std::cout << '\n';
    }
```

Saída:
```
    Initial valarray:     0  1  2  3  4  5  6  7  8  9
    After v[v > 5] = -1:  0  1  2  3  4  5 -1 -1 -1 -1
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto
---|---|---|---
[LWG 389](<https://cplusplus.github.io/LWG/issue389>) | C++98  | o tipo de retorno da sobrecarga (1) era `T` | corrigido para const T&  
[LWG 430](<https://cplusplus.github.io/LWG/issue430>) | C++98  | o comportamento era incerto para as sobrecargas  
(3-10) se um subconjunto inválido fosse especificado  | o comportamento é  
indefinido neste caso 