# std::ios_base::unsetf

void unsetf( fmtflags flags );

  
Desativa os flags de formatação identificados por flags.

### Parâmetros

flags  |  \-  |  flags de formatação a serem desativados. Pode ser uma combinação das constantes de [flags de formatação](<#/doc/io/ios_base/unsetf>).   
  
  
##### Flags de Formatação

Constante  |  Explicação   
---|---
[`dec`](<#/doc/io/ios_base/fmtflags>) |  usa base decimal para E/S de inteiros: veja [std::dec](<#/doc/io/manip/hex>)  
[`oct`](<#/doc/io/ios_base/fmtflags>) |  usa base octal para E/S de inteiros: veja [std::oct](<#/doc/io/manip/hex>)  
[`hex`](<#/doc/io/ios_base/fmtflags>) |  usa base hexadecimal para E/S de inteiros: veja [std::hex](<#/doc/io/manip/hex>)  
[`basefield`](<#/doc/io/ios_base/fmtflags>) |  dec | oct | hex. Útil para operações de mascaramento   
[`left`](<#/doc/io/ios_base/fmtflags>) |  ajuste à esquerda (adiciona caracteres de preenchimento à direita): veja [std::left](<#/doc/io/manip/left>)  
[`right`](<#/doc/io/ios_base/fmtflags>) |  ajuste à direita (adiciona caracteres de preenchimento à esquerda): veja [std::right](<#/doc/io/manip/left>)  
[`internal`](<#/doc/io/ios_base/fmtflags>) |  ajuste interno (adiciona caracteres de preenchimento ao ponto interno designado): veja [std::internal](<#/doc/io/manip/left>)  
[`adjustfield`](<#/doc/io/ios_base/fmtflags>) |  left | right | internal. Útil para operações de mascaramento   
[`scientific`](<#/doc/io/ios_base/fmtflags>) |  gera tipos de ponto flutuante usando notação científica, ou notação hexadecimal se combinado com fixed: veja [std::scientific](<#/doc/io/manip/fixed>)  
[`fixed`](<#/doc/io/ios_base/fmtflags>) |  gera tipos de ponto flutuante usando notação fixa, ou notação hexadecimal se combinado com scientific: veja [std::fixed](<#/doc/io/manip/fixed>)  
[`floatfield`](<#/doc/io/ios_base/fmtflags>) |  scientific | fixed. Útil para operações de mascaramento   
[`boolalpha`](<#/doc/io/ios_base/fmtflags>) |  insere e extrai o tipo bool em formato alfanumérico: veja [std::boolalpha](<#/doc/io/manip/boolalpha>)  
[`showbase`](<#/doc/io/ios_base/fmtflags>) |  gera um prefixo indicando a base numérica para saída de inteiros, requer o indicador de moeda em E/S monetária: veja [std::showbase](<#/doc/io/manip/showbase>)  
[`showpoint`](<#/doc/io/ios_base/fmtflags>) |  gera um caractere de ponto decimal incondicionalmente para saída de números de ponto flutuante: veja [std::showpoint](<#/doc/io/manip/showpoint>)  
[`showpos`](<#/doc/io/ios_base/fmtflags>) |  gera um caractere + para saída numérica não negativa: veja [std::showpos](<#/doc/io/manip/showpos>)  
[`skipws`](<#/doc/io/ios_base/fmtflags>) |  ignora espaços em branco iniciais antes de certas operações de entrada: veja [std::skipws](<#/doc/io/manip/skipws>)  
[`unitbuf`](<#/doc/io/ios_base/fmtflags>) |  descarrega a saída após cada operação de saída: veja [std::unitbuf](<#/doc/io/manip/unitbuf>)  
[`uppercase`](<#/doc/io/ios_base/fmtflags>) |  substitui certas letras minúsculas por seus equivalentes maiúsculos em certas operações de saída: veja [std::uppercase](<#/doc/io/manip/uppercase>)  
  
### Valor de retorno

(nenhum) 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ flags](<#/doc/io/ios_base/flags>) |  gerencia flags de formato   
(função membro pública)  
[ setf](<#/doc/io/ios_base/setf>) |  define um flag de formato específico   
(função membro pública)