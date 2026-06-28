# std::valarray&lt;T&gt;::operator+,-,~,!

```cpp
valarray<T> operator+() const;  // (1)
valarray<T> operator-() const;  // (2)
valarray<T> operator~() const;  // (3)
valarray<bool> operator!() const;  // (4)
```

  
Aplica operadores unários a cada elemento no array numérico.

### Parâmetros

(nenhum)

### Valor de retorno

Um array numérico contendo elementos com valores obtidos pela aplicação do operador correspondente aos valores em *this.

### Exceções

Pode lançar exceções definidas pela implementação.

### Notas

Cada um dos operadores só pode ser instanciado se os seguintes requisitos forem atendidos:

  * O operador indicado pode ser aplicado ao tipo `T`.
  * O valor resultante pode ser convertido de forma não ambígua para `T` (1-3) ou bool (4).

A função pode ser implementada com um tipo de retorno diferente de [std::valarray](<#/doc/numeric/valarray>). Neste caso, o tipo de substituição possui as seguintes propriedades:

  * Todas as funções membro const de [std::valarray](<#/doc/numeric/valarray>) são fornecidas.
  * [std::valarray](<#/doc/numeric/valarray>), [std::slice_array](<#/doc/numeric/valarray/slice_array>), [std::gslice_array](<#/doc/numeric/valarray/gslice_array>), [std::mask_array](<#/doc/numeric/valarray/mask_array>) e [std::indirect_array](<#/doc/numeric/valarray/indirect_array>) podem ser construídos a partir do tipo de substituição.
  * Para cada função que recebe um const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;&, exceto [`begin()`](<#/doc/numeric/valarray/begin2>) e [`end()`](<#/doc/numeric/valarray/end2>)(desde C++11), funções idênticas que recebem os tipos de substituição devem ser adicionadas;
  * Para cada função que recebe dois argumentos const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;&, funções idênticas que recebem cada combinação de const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;& e tipos de substituição devem ser adicionadas.
  * O tipo de retorno não adiciona mais de dois níveis de aninhamento de template sobre o tipo de argumento mais profundamente aninhado.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string_view>
    #include <valarray>
    
    template<typename T>
    void print(std::string_view const note,
               std::valarray<T> const vala, // by-value, see Notes above
               std::string_view const term = "\n")
    {
        std::cout << note << std::boolalpha << std::showpos;
        for (T const element : vala)
            std::cout << '\t' << element;
        std::cout << term;
    }
    
    int main()
    {
        std::valarray<int> x{1, 2, 3, 4};
        print<int>("x: ", x);
        print<int>("+x: ", +x);
        print<int>("+ + x: ", + + x);
        print<int>("-x: ", -x);
        print<int>("- - x: ", - - x, "\n\n");
    
        std::valarray<short> y{0, 1, -1, 0x7fff};
        print<short>("y: ", y);
        print<short>("~y: ", ~y);
        print<short>("~~y: ", ~~y, "\n\n");
    
        std::valarray<bool> z{true, false};
        print<bool>("z: ", z);
        print<bool>("!z: ", !z);
        print<bool>("!!z: ", !!z);
    }
```

Saída possível:
```
    x:      +1      +2      +3      +4
    +x:     +1      +2      +3      +4
    + + x:  +1      +2      +3      +4
    -x:     -1      -2      -3      -4
    - - x:  +1      +2      +3      +4
    
    y:      +0      +1      -1      +32767
    ~y:     -1      -2      +0      -32768
    ~~y:    +0      +1      -1      +32767
    
    z:      true    false
    !z:     false   true
    !!z:    true    false
```

### Veja também

[ operator+=operator-=operator*=operator/=operator%=operator&=operator|=operator^=operator<<=operator>>=](<#/doc/numeric/valarray/operator_arith2>) | aplica o operador de atribuição composta a cada elemento do valarray   
(função membro pública)  
[ operator+operator-operator*operator/operator%operator&operator|operator^operator<&lt;operator&gt;>operator&&operator||](<#/doc/numeric/valarray/operator_arith3>) | aplica operadores binários a cada elemento de dois valarrays, ou um valarray e um valor   
(template de função)