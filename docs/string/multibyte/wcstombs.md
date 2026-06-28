# std::wcstombs

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```c
std::size_t wcstombs( char* dst, const wchar_t* src, std::size_t len );
```

  
Converte uma sequência de caracteres largos do array cujo primeiro elemento é apontado por src para sua representação multibyte estreita que começa no estado de deslocamento inicial. Os caracteres convertidos são armazenados nos elementos sucessivos do array de char apontado por dst. Não mais que len bytes são escritos no array de destino.

Cada caractere é convertido como se por uma chamada para [std::wctomb](<#/doc/string/multibyte/wctomb>), exceto que o estado de conversão de wctomb não é afetado. A conversão para se:

  * O caractere nulo foi convertido e armazenado.
  * Um wchar_t foi encontrado que não corresponde a um caractere válido na locale C atual.
  * O próximo caractere multibyte a ser armazenado excederia len.

### Notas

Na maioria das implementações, esta função atualiza um objeto estático global do tipo [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>) enquanto processa a string, e não pode ser chamada simultaneamente por duas threads; [std::wcsrtombs](<#/doc/string/multibyte/wcsrtombs>) deve ser usada em tais casos.

POSIX especifica uma extensão comum: se dst for um ponteiro nulo, esta função retorna o número de bytes que seriam escritos em dst, se convertidos. Comportamento semelhante é padrão para [std::wcsrtombs](<#/doc/string/multibyte/wcsrtombs>).

### Parâmetros

dst  |  \-  |  ponteiro para o array de caracteres estreitos onde o caractere multibyte será armazenado   
---|---|---
src  |  \-  |  ponteiro para o primeiro elemento de uma string larga terminada em nulo a ser convertida   
len  |  \-  |  número de bytes disponíveis no array apontado por dst   
  
### Valor de retorno

Em caso de sucesso, retorna o número de bytes (incluindo quaisquer sequências de deslocamento, mas excluindo o '\0' terminador) escritos no array de caracteres cujo primeiro elemento é apontado por dst.

Em erro de conversão (se um caractere largo inválido for encontrado), retorna static_cast<[std::size_t](<#/doc/types/size_t>)>(-1).

### Exemplo

Execute este código
```
    #include <clocale>
    #include <cstdlib>
    #include <iostream>
     
    int main()
    {
        std::setlocale(LC_ALL, "en_US.utf8");
        // UTF-8 narrow multibyte encoding
        const wchar_t* wstr = L"z\u00df\u6c34\U0001d10b"; // or L"zß水𝄋"
        char mbstr[11];
        std::wcstombs(mbstr, wstr, 11);
        std::cout << "multibyte string: " << mbstr << '\n';
    }
```

Saída: 
```
    multibyte string: zß水𝄋
```

### Veja também

[ wcsrtombs](<#/doc/string/multibyte/wcsrtombs>) |  converte uma string larga para uma string de caracteres multibyte estreita, dado um estado   
(função)  
[ mbstowcs](<#/doc/string/multibyte/mbstowcs>) |  converte uma string de caracteres multibyte estreita para uma string larga   
(função)  
[ do_out](<#/doc/locale/codecvt/out>)[virtual] |  converte uma string de `InternT` para `ExternT`, como ao escrever em um arquivo   
(função membro virtual protegida de `std::codecvt<InternT,ExternT,StateT>`)  
[Documentação C](<#/>) para wcstombs