# std::FILE

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
typedef /* unspecified */ FILE;
```

  
Cada objeto `std::FILE` denota um stream C.

O padrão C (referenciado pelo padrão C++) não especifica se `std::FILE` é um tipo de objeto completo. Embora possa ser possível copiar um `std::FILE` válido, usar um ponteiro para tal cópia como argumento para uma função de E/S invoca comportamento indefinido. Em outras palavras, `std::FILE` pode ser semanticamente não copiável.

Streams de E/S podem ser usados tanto para entrada e saída não formatadas quanto formatadas. Além disso, as funções que lidam com entrada e saída também podem ser sensíveis à locale, de modo que conversões wide/multibyte sejam realizadas conforme necessário.

### Estado do Stream

Além das informações específicas do sistema necessárias para acessar o dispositivo (_e.g.,_ um descritor de arquivo POSIX), cada objeto `std::FILE` direta ou indiretamente mantém o seguinte:

  1. Largura do caractere: não definida, narrow, ou wide.
  2. Estado de análise para conversões entre caracteres multibyte e wide (um objeto do tipo [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>))
  3. Estado de buffer: sem buffer, buffer de linha, buffer completo.
  4. O buffer, que pode ser substituído por um buffer externo fornecido pelo usuário.
  5. Modo de E/S: entrada, saída, ou atualização (ambos entrada e saída).
  6. Indicador de modo binário/texto.
  7. Indicador de status de fim de arquivo.
  8. Indicador de status de erro.
  9. Indicador de posição do arquivo, acessível como um objeto do tipo [std::fpos_t](<#/doc/io/c/fpos_t>), que, para streams wide, inclui o estado de análise.
  10. (C++17) Lock reentrante usado para prevenir data races quando múltiplas threads leem, escrevem, posicionam ou consultam a posição de um stream.

#### Orientação narrow e wide

Um stream recém-aberto não tem orientação. A primeira chamada para std::fwide ou para qualquer função de E/S estabelece a orientação: uma função de E/S wide torna o stream wide-oriented; uma função de E/S narrow torna o stream narrow-oriented. Uma vez definida, a orientação pode ser alterada apenas com [std::freopen](<#/doc/io/c/freopen>). Funções de E/S narrow não podem ser chamadas em um stream wide-oriented; funções de E/S wide não podem ser chamadas em um stream narrow-oriented. Funções de E/S wide convertem entre caracteres wide e multibyte como se chamassem [std::mbrtowc](<#/doc/string/multibyte/mbrtowc>) ou [std::wcrtomb](<#/doc/string/multibyte/wcrtomb>) com o estado de conversão conforme descrito pelo stream. Ao contrário das strings de caracteres multibyte que são válidas em um programa, as sequências de caracteres multibyte no arquivo podem conter nulos embutidos e não precisam começar ou terminar no estado de shift inicial.

O estado de conversão de um stream com orientação wide é estabelecido pela locale C que está instalada no momento em que a orientação do stream é definida.

#### Modos binário e texto

Um _stream de texto_ é uma sequência ordenada de caracteres que pode ser composta em linhas; uma linha pode ser decomposta em zero ou mais caracteres mais um caractere '\n' ("newline") de terminação. Se a última linha requer um '\n' de terminação é definido pela implementação. Além disso, caracteres podem ter que ser adicionados, alterados ou excluídos na entrada e saída para se conformar às convenções de representação de texto no SO (em particular, streams C no SO Windows convertem '\n' para '\r\n' na saída, e convertem '\r\n' para '\n' na entrada).

Dados lidos de um stream de texto são garantidos como iguais aos dados que foram anteriormente escritos para esse stream somente se cada um dos seguintes for verdadeiro:

  * Os dados consistem apenas em caracteres imprimíveis e/ou os caracteres de controle '\t' e '\n' (em particular, no SO Windows, o caractere '\0x1A' termina a entrada).
  * Nenhum caractere '\n' é imediatamente precedido por caracteres de espaço (tais caracteres de espaço podem desaparecer quando tal saída é lida posteriormente como entrada).
  * O último caractere é '\n'.

Um _stream binário_ é uma sequência ordenada de caracteres que pode registrar dados internos de forma transparente. Dados lidos de um stream binário sempre são iguais aos dados que foram anteriormente escritos para esse stream, exceto que uma implementação pode anexar um número indeterminado de caracteres nulos ao final do stream. Um stream binário wide não precisa terminar no estado de shift inicial.

### Notas

POSIX exige explicitamente que a faceta `LC_CTYPE` da locale C atualmente instalada seja armazenada dentro do objeto `FILE` no momento em que a orientação do stream se torna wide; POSIX exige que esta faceta `LC_CTYPE` seja usada para toda E/S futura neste stream até que a orientação seja alterada, independentemente de qualquer chamada subsequente a [std::setlocale](<#/doc/locale/setlocale>).

Pretende-se que cada linha de texto seja composta por dados que são essencialmente legíveis por humanos. Implementações POSIX não distinguem entre streams de texto e binários (não há mapeamento especial para '\n' ou quaisquer outros caracteres).

### Veja também

[ basic_streambuf](<#/doc/io/basic_streambuf>) | abstrai um dispositivo raw   
(class template)  
[ basic_filebuf](<#/doc/io/basic_filebuf>) | implementa um dispositivo de arquivo raw   
(class template)  
[ stdinstdoutstderr](<#/doc/io/c/std_streams>) | expressão do tipo FILE* associada ao stream de entrada  
expressão do tipo FILE* associada ao stream de saída  
expressão do tipo FILE* associada ao stream de saída de erro   
(macro constant)  
[documentação C](<#/>) para FILE