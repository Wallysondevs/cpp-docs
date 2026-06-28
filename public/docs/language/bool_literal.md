# Literais Booleanos

### Sintaxe  
  
---  
`true` |  (1)  |   
---|---|---
`false` |  (2)  |   
  
### Explicação

Os literais booleanos são as palavras-chave true e false. Eles são [prvalues](<#/doc/language/value_category>) do tipo [`bool`](<#/doc/language/types>). 

### Notas

Veja [conversões integrais](<#/doc/language/implicit_cast>) para conversões implícitas de `bool` para outros tipos e [conversões booleanas](<#/doc/language/implicit_cast>) para as conversões implícitas de outros tipos para `bool`. 

### Palavras-chave

[`false`](<#/doc/keyword/false>), [`true`](<#/doc/keyword/true>)

### Exemplo

Execute este código
```
    #include <iostream>
     
    int main()
    {
        std::cout << std::boolalpha
                  << true << '\n'
                  << false << '\n'
                  << std::noboolalpha
                  << true << '\n'
                  << false << '\n';
    }
```

Saída: 
```
    true
    false
    1
    0
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024): 

    

  * 5.13.6 Boolean literals [lex.bool] 

  * Padrão C++20 (ISO/IEC 14882:2020): 

    

  * 5.13.6 Boolean literals [lex.bool] 

  * Padrão C++17 (ISO/IEC 14882:2017): 

    

  * 5.13.6 Boolean literals [lex.bool] 

  * Padrão C++14 (ISO/IEC 14882:2014): 

    

  * 2.13.6 Boolean literals [lex.bool] 

  * Padrão C++11 (ISO/IEC 14882:2011): 

    

  * 2.13.6 Boolean literals [lex.bool] 

  * Padrão C++98 (ISO/IEC 14882:1998): 

    

  * 2.13.5 Boolean literals [lex.bool] 

### Veja também

[documentação C](<#/>) para constantes booleanas predefinidas  
---