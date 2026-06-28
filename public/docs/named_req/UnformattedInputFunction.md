# Requisitos nomeados C++: UnformattedInputFunction

### Requisitos

Uma UnformattedInputFunction é uma função de entrada de stream que executa o seguinte:

1) Constrói um objeto do tipo [`basic_istream::sentry`](<#/doc/io/basic_istream/sentry>) com duração de armazenamento automática e com o argumento `noskipws` definido como true, que executa o seguinte:

  * Se [`eofbit`](<#/doc/io/ios_base/iostate>) ou [`badbit`](<#/doc/io/ios_base/iostate>) estiverem definidos no stream de entrada, define [`failbit`](<#/doc/io/ios_base/iostate>) também, e se exceções em `failbit` estiverem habilitadas na [máscara de exceção](<#/doc/io/basic_ios/exceptions>) deste stream de entrada ((exceptions() & failbit) != 0), lança [`ios_base::failure`](<#/doc/io/ios_base/failure>).
  * Descarrega o stream de saída associado por `tie()`, se aplicável.

2) Verifica o status do sentry chamando `sentry::operator bool()`, que é equivalente a [`basic_ios::good`](<#/doc/io/basic_ios/good>).

  * Se o operador retornar false ou o construtor do sentry lançar uma exceção:

  * Define o número de caracteres extraídos (gcount) no stream de entrada como zero.
  * Se a função foi chamada para escrever em um array de `CharT`, escreve `CharT()` (o caractere nulo) na primeira posição do array.

  * Se o operador retornar true, executa a entrada como se chamasse rdbuf()->sbumpc() ou rdbuf()->sgetc().

  * Se o fim do stream for atingido (a chamada para rdbuf()->sbumpc() ou rdbuf()->sgetc() retornar Traits::eof()), define `eofbit`. Se exceções em `eofbit` estiverem habilitadas na [máscara de exceção](<#/doc/io/basic_ios/exceptions>) deste stream ((exceptions() & eofbit) != 0), lança [`ios_base::failure`](<#/doc/io/ios_base/failure>).
  * Se uma exceção for lançada durante a entrada, define `badbit` no stream de entrada. Se exceções em `badbit` estiverem habilitadas na [máscara de exceção](<#/doc/io/basic_ios/exceptions>) deste stream ((exceptions() & badbit) != 0), a exceção também é relançada.

  * Exceções lançadas de [`basic_ios::clear`](<#/doc/io/basic_ios/clear>) não são capturadas ou relançadas.

  * Se nenhuma exceção foi lançada durante a entrada, define o número de caracteres extraídos (gcount) no stream de entrada.

3) Em qualquer caso, seja terminando por exceção ou retornando, o destrutor do sentry é chamado antes de sair desta função.

### Biblioteca padrão

As seguintes funções da biblioteca padrão são **UnformattedInputFunction s**.

  * [std::getline](<#/doc/string/basic_string/getline>), exceto que não modifica gcount.
  * [`basic_istream::operator>>(basic_streambuf*)`](<#/doc/io/basic_istream/operator_gtgt>)
  * [`basic_istream::get`](<#/doc/io/basic_istream/get>)
  * [`basic_istream::getline`](<#/doc/io/basic_istream/getline>)
  * [`basic_istream::ignore`](<#/doc/io/basic_istream/ignore>)
  * [`basic_istream::peek`](<#/doc/io/basic_istream/peek>)
  * [`basic_istream::read`](<#/doc/io/basic_istream/read>)
  * [`basic_istream::readsome`](<#/doc/io/basic_istream/readsome>)
  * [`basic_istream::putback`](<#/doc/io/basic_istream/putback>), exceto que primeiro limpa `eofbit`.
  * [`basic_istream::unget`](<#/doc/io/basic_istream/unget>), exceto que primeiro limpa `eofbit`.
  * [`basic_istream::sync`](<#/doc/io/basic_istream/sync>), exceto que não modifica gcount.
  * [`basic_istream::tellg`](<#/doc/io/basic_istream/tellg>), exceto que não modifica gcount.
  * [`basic_istream::seekg`](<#/doc/io/basic_istream/seekg>), exceto que primeiro limpa `eofbit` e não modifica gcount.
  * [std::ws](<#/doc/io/manip/ws>), exceto que não modifica gcount.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 61](<https://cplusplus.github.io/LWG/issue61>) | C++98 | não estava claro se lançar uma exceção devido à definição de `eofbit` e/ou `failbit` resultaria na definição de `badbit` | exceções lançadas de [`basic_ios::clear`](<#/doc/io/basic_ios/clear>) não são capturadas ou relançadas
[LWG 160](<https://cplusplus.github.io/LWG/issue160>) | C++98 | o processo de determinar se a exceção capturada é relançada mencionava uma função `exception()` inexistente | corrigido para [`exceptions()`](<#/doc/io/basic_ios/exceptions>)
[LWG 243](<https://cplusplus.github.io/LWG/issue243>) | C++98 | o comportamento quando `sentry::operator bool()` retorna false ou o objeto sentry falha ao ser construído não era especificado | especificado