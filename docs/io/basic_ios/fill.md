# std::basic_ios&lt;CharT,Traits&gt;::fill

```cpp
CharT fill() const;  // (1)
CharT fill( CharT ch );  // (2)
```

  
Gerencia o caractere de preenchimento usado para completar as conversões de saída para a largura de campo especificada.

1) Retorna o caractere de preenchimento atual.

2) Define o caractere de preenchimento como `ch`, retorna o valor anterior do caractere de preenchimento.

### Parâmetros

ch  |  \-  |  o caractere a ser usado como caractere de preenchimento   
  
### Valor de retorno

O caractere de preenchimento antes da chamada à função.

### Exemplo

Execute este código
```cpp 
    #include <iomanip>
    #include <iostream>
     
    int main ()
    {
        std::cout << "With default setting : " << [std::setw(10) << 40 << "]\n";
        char prev = std::cout.fill('x');
        std::cout << "Replaced '" << prev << "' with '"
                  << std::cout.fill() << "': " << [std::setw(10) << 40 << "]\n";
    }
```

Saída: 
```
    With default setting : [        40]
    Replaced ' ' with 'x': [xxxxxxxx40]
```

### Veja também

[ setfill](<#/doc/io/manip/setfill>) |  altera o caractere de preenchimento   
(modelo de função)  