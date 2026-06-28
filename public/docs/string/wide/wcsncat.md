# std::wcsncat

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
wchar_t* wcsncat( wchar_t* dest, const wchar_t* src, std::size_t count );
```

Anexa no máximo `count` caracteres largos da string larga apontada por `src` ao final da string de caracteres apontada por `dest`, parando se o terminador nulo for copiado. O caractere largo `src[0]` substitui o terminador nulo no final de `dest`. O terminador nulo é sempre anexado no final (portanto, o número máximo de caracteres largos que a função pode escrever é `count + 1`).

O comportamento é indefinido se o array de destino não for grande o suficiente para o conteúdo de `src` e `dest` e o caractere largo nulo terminador.

O comportamento é indefinido se as strings se sobrepuserem.

### Parâmetros

- **dest** — ponteiro para a string larga terminada em nulo à qual anexar
- **src** — ponteiro para a string larga terminada em nulo da qual copiar
- **count** — número máximo de caracteres largos a copiar

### Valor de retorno

dest

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <cwchar> 
    #include <iostream>
     
    int main(void) 
    {
        wchar_t str[50] = L"Земля, прощай.";
        std::wcsncat(str, L" ", 1);
        std::wcsncat(str, L"В добрый путь.", 8); // only append the first 8 wide chars
     
        std::setlocale(LC_ALL, "en_US.utf8");
        std::wcout.imbue(std::locale("en_US.utf8"));
        std::wcout << str << '\n';
    }
```

Saída possível:
```
    Земля, прощай. В добрый
```

### Veja também

[ wcscat](<#/doc/string/wide/wcscat>) | anexa uma cópia de uma string larga a outra
(função)
[ strncat](<#/doc/string/byte/strncat>) | concatena uma certa quantidade de caracteres de duas strings
(função)
[ wcscpy](<#/doc/string/wide/wcscpy>) | copia uma string larga para outra
(função)
[Documentação C](<#/>) para wcsncat