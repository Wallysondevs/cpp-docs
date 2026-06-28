# std::wcsrchr

Definido no header `[<cwchar>](<#/doc/header/cwchar>)`

```cpp
const wchar_t* wcsrchr( const wchar_t* str, wchar_t ch );
wchar_t* wcsrchr( wchar_t* str, wchar_t ch );
```

  
Encontra a última ocorrência do caractere largo ch na string larga apontada por str. 

### Parâmetros

str  |  \-  |  ponteiro para a string larga terminada em nulo a ser analisada   
---|---|---
ch  |  \-  |  caractere largo a ser procurado   
  
### Valor de retorno

Ponteiro para o caractere encontrado em str, ou um ponteiro nulo se nenhum caractere for encontrado. 

### Exemplo

Execute este código
```cpp
    #include <cwchar>
    #include <iostream>
    #include <locale>
     
    int main()
    {
        const wchar_t arr[] = L"白猫 黒猫 кошки";
        const wchar_t* cat = std::wcsrchr(arr, L'猫');
        const wchar_t* dog = std::wcsrchr(arr, L'犬');
     
        std::cout.imbue(std::locale("en_US.utf8"));
     
        if (cat)
            std::cout << "The character 猫 found at position " << cat - arr << '\n';
        else
            std::cout << "The character 猫 not found\n";
     
        if (dog)
            std::cout << "The character 犬 found at position " << dog - arr << '\n';
        else
            std::cout << "The character 犬 not found\n";
    }
```

Saída: 
```
    The character 猫 found at position 4
    The character 犬 not found
```

### Veja também

[ wcschr](<#/doc/string/wide/wcschr>) |  encontra a primeira ocorrência de um caractere largo em uma string larga   
(função)  
[ strrchr](<#/doc/string/byte/strrchr>) |  encontra a última ocorrência de um caractere   
(função)  
[ rfind](<#/doc/string/basic_string/rfind>) |  encontra a última ocorrência de uma substring   
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)  
[Documentação C](<#/>) para wcsrchr