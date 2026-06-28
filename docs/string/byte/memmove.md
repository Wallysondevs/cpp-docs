# std::memmove

Definido no header `[<cstring>](<#/doc/header/cstring>)`

```cpp
void* memmove( void* dest, const void* src, std::size_t count );
```

Copia count caracteres do objeto apontado por src para o objeto apontado por dest. Ambos os objetos são reinterpretados como arrays de unsigned char.

Os objetos podem se sobrepor: a cópia ocorre como se os caracteres fossem copiados para um array de caracteres temporário e, em seguida, os caracteres fossem copiados do array para dest.

Se dest ou src for um [ponteiro inválido ou nulo](<#/doc/language/pointer>), o comportamento é indefinido, mesmo que count seja zero.

Se os objetos são [potencialmente sobrepostos](<#/doc/language/objects>) ou não são [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>), o comportamento de `memmove` não é especificado e [pode ser indefinido](<https://stackoverflow.com/questions/29777492>).

### Parâmetros

- **dest** — ponteiro para o local de memória para onde copiar
- **src** — ponteiro para o local de memória de onde copiar
- **count** — número de bytes a copiar

### Valor de retorno

dest

### Notas

`std::memmove` pode ser usado para [criar implicitamente](<#/doc/language/objects>) objetos no buffer de destino.

Apesar de ser especificado "como se" um buffer temporário fosse usado, as implementações reais desta função não incorrem na sobrecarga de cópia dupla ou memória extra. Para um count pequeno, ela pode carregar e escrever registradores; para blocos maiores, uma abordagem comum (glibc e bsd libc) é copiar bytes para frente a partir do início do buffer se o destino começar antes da origem, e para trás a partir do final caso contrário, com um fallback para [std::memcpy](<#/doc/string/byte/memcpy>) quando não há sobreposição alguma.

Onde o [strict aliasing](<#/doc/language/objects>) proíbe examinar a mesma memória como valores de dois tipos diferentes, `std::memmove` pode ser usado para converter os valores.

### Exemplo

Execute este código
```
    #include <cstring>
    #include <iostream>
    
    int main()
    {
        char str[] = "1234567890";
        std::cout << str << '\n';
        std::memmove(str + 4, str + 3, 3); // copies from [4, 5, 6] to [5, 6, 7]
        std::cout << str << '\n';
    }
```

Saída:
```
    1234567890
    1234456890
```

### Veja também

[ memcpy](<#/doc/string/byte/memcpy>) | copia um buffer para outro
(função)
[ memset](<#/doc/string/byte/memset>) | preenche um buffer com um caractere
(função)
[ wmemmove](<#/doc/string/wide/wmemmove>) | copia uma certa quantidade de caracteres largos entre dois arrays, possivelmente sobrepostos
(função)
[ copy](<#/doc/algorithm/copy>)/[copy_if](<#/doc/algorithm/copy>)(C++11) | copia um range de elementos para um novo local
(function template)
[ copy_backward](<#/doc/algorithm/copy_backward>) | copia um range de elementos em ordem inversa
(function template)
[ is_trivially_copyable](<#/doc/types/is_trivially_copyable>)(C++11) | verifica se um tipo é trivially copyable
(class template)
[documentação C](<#/>) para memmove