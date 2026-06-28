# nullptr, o literal de ponteiro (desde C++11)

### Sintaxe  
  
---  
`nullptr`
  
### Explicação

A palavra-chave `nullptr` denota o literal de ponteiro. É um [prvalue](<#/doc/language/value_category>) do tipo [std::nullptr_t](<#/doc/types/nullptr_t>). Existem [conversões implícitas](<#/doc/language/implicit_cast>) de `nullptr` para valor de ponteiro nulo de qualquer tipo de ponteiro e qualquer tipo de ponteiro para membro. Conversões semelhantes existem para qualquer constante de ponteiro nulo, que inclui valores do tipo [std::nullptr_t](<#/doc/types/nullptr_t>) bem como a macro [NULL](<#/doc/types/NULL>). 

### Palavras-chave

[`nullptr`](<#/doc/keyword/nullptr>)

### Exemplo

Demonstra que `nullptr` mantém o significado de constante de ponteiro nulo mesmo que não seja mais um literal.

Execute este código
```
    #include <cstddef>
    #include <iostream>
     
    template<class T>
    constexpr T clone(const T& t)
    {
        return t;
    }
     
    void g(int*)
    {
        std::cout << "Function g called\n";
    }
     
    int main()
    {
        g(nullptr);        // Fine
        g(NULL);           // Fine
        g(0);              // Fine
     
        g(clone(nullptr)); // Fine
    //  g(clone(NULL));    // ERROR: non-literal zero cannot be a null pointer constant
    //  g(clone(0));       // ERROR: non-literal zero cannot be a null pointer constant
    }
```

Saída: 
```
    Function g called
    Function g called
    Function g called
    Function g called
```

### Referências

  * C++23 standard (ISO/IEC 14882:2024): 

    

  * 7.3.12 Pointer conversions [conv.ptr] 

  * C++20 standard (ISO/IEC 14882:2020): 

    

  * 7.3.12 Pointer conversions [conv.ptr] 

  * C++17 standard (ISO/IEC 14882:2017): 

    

  * 7.11 Pointer conversions [conv.ptr] 

  * C++14 standard (ISO/IEC 14882:2014): 

    

  * 4.10 Pointer conversions [conv.ptr] 

  * C++11 standard (ISO/IEC 14882:2011): 

    

  * 4.10 Pointer conversions [conv.ptr] 

### Veja também

[ NULL](<#/doc/types/NULL>) |  constante de ponteiro nulo definida pela implementação   
(macro constante)  
[ nullptr_t](<#/doc/types/nullptr_t>)(C++11) |  o tipo do literal de ponteiro nulo `nullptr`   
(typedef)  
[C documentation](<#/>) para nullptr