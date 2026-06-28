# std::localeconv

Definido no cabeçalho `[<clocale>](<#/doc/header/clocale>)`

```c
std::lconv* localeconv();
```

  
A função `localeconv` obtém um ponteiro para um objeto estático do tipo [std::lconv](<#/doc/locale/lconv>), que representa as regras de formatação numérica e monetária do locale C atual. 

### Parâmetros

(nenhum) 

### Valor de retorno

Ponteiro para o objeto [std::lconv](<#/doc/locale/lconv>) atual. 

### Notas

Modificar as referências do objeto através do ponteiro retornado é comportamento indefinido. 

A `std::localeconv` modifica um objeto estático; chamá-la de diferentes threads sem sincronização é comportamento indefinido. 

### Exemplo

Execute este código
```cpp 
    #include <clocale>
    #include <iostream>
     
    int main()
    {
        std::setlocale(LC_ALL, "ja_JP.UTF-8");
        std::lconv* lc = std::localeconv();
        std::cout << "Japanese currency symbol: " << lc->currency_symbol
                  << '(' << lc->int_curr_symbol << ")\n";
    }
```

Saída: 
```
    Japanese currency symbol: ￥(JPY )
```

### Veja também

[ setlocale](<#/doc/locale/setlocale>) | obtém e define o locale C atual   
(função)  
[ lconv](<#/doc/locale/lconv>) | detalhes de formatação, retornado por **std::localeconv**   
(classe)  
[Documentação C](<#/>) para localeconv