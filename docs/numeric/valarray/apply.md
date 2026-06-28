# std::valarray&lt;T&gt;::apply

valarray&lt;T&gt; apply( T func(T) ) const;
valarray&lt;T&gt; apply( T func(const T&) ) const;

  
Retorna um novo valarray do mesmo tamanho com valores que são obtidos aplicando a função `func` aos valores anteriores dos elementos.

### Parâmetros

func  |  \-  |  função a ser aplicada aos valores   
  
### Valor de retorno

O valarray resultante com valores obtidos aplicando a função `func`.

### Observações

A função pode ser implementada com um tipo de retorno diferente de [std::valarray](<#/doc/numeric/valarray>). Neste caso, o tipo de substituição possui as seguintes propriedades:

    

  * Todas as funções membro const de [std::valarray](<#/doc/numeric/valarray>) são fornecidas.
  * [std::valarray](<#/doc/numeric/valarray>), [std::slice_array](<#/doc/numeric/valarray/slice_array>), [std::gslice_array](<#/doc/numeric/valarray/gslice_array>), [std::mask_array](<#/doc/numeric/valarray/mask_array>) e [std::indirect_array](<#/doc/numeric/valarray/indirect_array>) podem ser construídos a partir do tipo de substituição.
  * Para cada função que recebe um const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;&, exceto [`begin()`](<#/doc/numeric/valarray/begin2>) e [`end()`](<#/doc/numeric/valarray/end2>)(desde C++11), funções idênticas que recebem os tipos de substituição devem ser adicionadas;
  * Para cada função que recebe dois argumentos const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;&, funções idênticas que recebem cada combinação de const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;& e tipos de substituição devem ser adicionadas.
  * O tipo de retorno não adiciona mais de dois níveis de aninhamento de template sobre o tipo de argumento mais profundamente aninhado.

### Implementação possível

As seguintes implementações diretas podem ser substituídas por expression templates para uma maior eficiência.
```
    template<class T>
    valarray<T> valarray<T>::apply(T func(T)) const
    {
        valarray<T> other = *this;
        for (T& i : other)
            i = func(i);
        return other;
    }
     
    template<class T>
    valarray<T> valarray<T>::apply(T func(const T&)) const
    {
        valarray<T> other = *this;
        for (T& i : other)
            i = func(i);
        return other;
    }
```
  
---  
  
### Exemplo

Calcula e imprime os 10 primeiros fatoriais.

Execute este código
```
    #include <cmath>
    #include <iostream>
    #include <valarray>
     
    int main()
    {
        std::valarray<int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        v = v.apply( -> int
                    {
                        return std::round(std::tgamma(n + 1));
                    });
        for (auto n : v)
            std::cout << n << ' ';
        std::cout << '\n';
    }
```

Saída: 
```
    1 2 6 24 120 720 5040 40320 362880 3628800
```

### Veja também

[ for_each](<#/doc/algorithm/for_each>) |  aplica uma função a um range de elementos   
(modelo de função)  
[ ranges::for_each](<#/doc/algorithm/ranges/for_each>)(C++20) |  aplica uma função a um range de elementos  
(objeto de função de algoritmo)