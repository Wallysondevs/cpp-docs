# std::wcscat

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
wchar_t* wcscat( wchar_t* dest, const wchar_t* src );
```

  
Anexa uma cópia da wide string apontada por src ao final da wide string apontada por dest. O wide character src[0] substitui o terminador nulo no final de dest. A wide string resultante é terminada em nulo.

O comportamento é indefinido se o array de destino não for grande o suficiente para o conteúdo de src e dest e o wide character nulo terminador.

O comportamento é indefinido se as strings se sobrepuserem.

### Parâmetros

dest  |  \-  |  ponteiro para a wide string terminada em nulo à qual anexar   
---|---|---
src  |  \-  |  ponteiro para a wide string terminada em nulo da qual copiar   
  
### Valor de retorno

Retorna uma cópia de dest.

### Exemplo

Execute este código
```
    #include <clocale>
    #include <cwchar> 
    #include <iostream>
     
    int main(void) 
    {
        wchar_t str[50] = L"Земля, прощай.";
        std::wcscat(str, L" ");
        std::wcscat(str, L"В добрый путь.");
     
        std::setlocale(LC_ALL, "en_US.utf8");
        std::wcout.imbue(std::locale("en_US.utf8"));
        std::wcout << str << '\n';
    }
```

Saída possível: 
```
    Земля, прощай. В добрый путь.
```

### Veja também

[ wcsncat](<#/doc/string/wide/wcsncat>) |  anexa uma certa quantidade de wide characters de uma wide string para outra   
(função)  
[ strcat](<#/doc/string/byte/strcat>) |  concatena duas strings   
(função)  
[ wcscpy](<#/doc/string/wide/wcscpy>) |  copia uma wide string para outra   
(função)  
[Documentação C](<#/>) para wcscat