# std::ungetwc

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
std::wint_t ungetwc( std::wint_t ch, std::FILE* stream );
```

  
Se `ch` não for igual a WEOF, insere o caractere largo `ch` no buffer de entrada associado ao stream `stream` de tal forma que uma operação de leitura subsequente de `stream` recuperará esse caractere largo. O dispositivo externo associado ao stream não é modificado. 

Operações de reposicionamento de stream [std::fseek](<#/doc/io/c/fseek>), [std::fsetpos](<#/doc/io/c/fsetpos>), e [std::rewind](<#/doc/io/c/rewind>) descartam os efeitos de `std::ungetwc`. 

Se `std::ungetwc` for chamado mais de uma vez sem uma leitura ou reposicionamento intermediário, ele pode falhar (em outras palavras, um buffer de pushback de tamanho 1 é garantido, mas qualquer buffer maior é definido pela implementação). Se múltiplas chamadas bem-sucedidas de `std::ungetwc` forem realizadas, as operações de leitura recuperam os caracteres largos inseridos de volta na ordem inversa de `std::ungetwc`.

Se `ch` for igual a WEOF, a operação falha e o stream não é afetado. 

Uma chamada bem-sucedida a `std::ungetwc` limpa o flag de status de fim de arquivo feof. 

Uma chamada bem-sucedida a `std::ungetwc` em um stream (seja de texto ou binário) modifica o indicador de posição do stream de maneira não especificada, mas garante que, após todos os caracteres largos inseridos de volta serem recuperados com uma operação de leitura, o indicador de posição do stream seja igual ao seu valor antes de `std::ungetwc`. 

### Parâmetros

ch  |  \-  |  caractere largo a ser inserido de volta   
---|---|---
stream  |  \-  |  stream de arquivo para inserir o caractere largo de volta   
  
### Valor de retorno

Em caso de sucesso, `ch` é retornado. 

Em caso de falha, WEOF é retornado e o stream fornecido permanece inalterado. 

### Ver também

[ ungetc](<#/doc/io/c/ungetc>) |  insere um caractere de volta em um stream de arquivo   
(função)  
[ fgetwcgetwc](<#/doc/io/c/fgetwc>) |  obtém um caractere largo de um stream de arquivo   
(função)  
[Documentação C](<#/>) para ungetwc