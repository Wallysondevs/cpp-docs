# std::mbsinit

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
int mbsinit( const std::mbstate_t* ps);
```

Se ps não for um ponteiro nulo, a função `mbsinit` determina se o objeto [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>) apontado descreve o estado de conversão inicial.

### Notas

Embora um [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>) inicializado com zero sempre represente o estado de conversão inicial, pode haver outros valores de [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>) que também representem o estado de conversão inicial.

### Parâmetros

- **ps** — ponteiro para o objeto [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>) a ser examinado

### Valor de retorno

​0​ se ps não for um ponteiro nulo e não representar o estado de conversão inicial, valor diferente de zero caso contrário.

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <cwchar>
    #include <iostream>
    #include <string>
    
    int main()
    {
        // allow mbrlen() to work with UTF-8 multibyte encoding
        std::setlocale(LC_ALL, "en_US.utf8");
        // UTF-8 narrow multibyte encoding
        std::string str = "水"; // or u8"\u6c34" or "\xe6\xb0\xb4"
        std::mbstate_t mb = std::mbstate_t();
        (void)std::mbrlen(&str[0], 1, &mb);
        if (!std::mbsinit(&mb))
            std::cout << "After processing the first 1 byte of " << str
                      << " the conversion state is not initial\n";
    
        (void)std::mbrlen(&str[1], str.size() - 1, &mb);
        if (std::mbsinit(&mb))
            std::cout << "After processing the remaining 2 bytes of " << str
                      << ", the conversion state is initial conversion state\n";
    }
```

Saída:
```
    After processing the first 1 byte of 水 the conversion state is not initial
    After processing the remaining 2 bytes of 水, the conversion state is initial conversion state
```

### Veja também

[ mbstate_t](<#/doc/string/multibyte/mbstate_t>) | informações de estado de conversão necessárias para iterar strings de caracteres multibyte
(classe)
[Documentação C](<#/>) para mbsinit