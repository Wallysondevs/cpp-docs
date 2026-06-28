# Requisitos nomeados C++: UnformattedOutputFunction

### Requisitos

Uma UnformattedOutputFunction é uma função de saída de stream que executa o seguinte:

1) Constrói um objeto do tipo [`basic_ostream::sentry`](<#/doc/io/basic_ostream/sentry>) com duração de armazenamento automática, que executa o seguinte:

  * Se [`eofbit`](<#/doc/io/ios_base/iostate>) ou [`badbit`](<#/doc/io/ios_base/iostate>) estiverem definidos no stream de saída, define o [`failbit`](<#/doc/io/ios_base/iostate>) também, e se exceções em `failbit` estiverem habilitadas na [máscara de exceção](<#/doc/io/basic_ios/exceptions>) deste stream de saída ((exceptions() & failbit) != 0), lança [`ios_base::failure`](<#/doc/io/ios_base/failure>).
  * Descarrega (flushes) o stream de saída associado por tie(), se aplicável.

2) Verifica o status do sentry chamando `sentry::operator bool()`, que é equivalente a [`basic_ios::good`](<#/doc/io/basic_ios/good>).

  * Se o operador retornar false ou o construtor do sentry lançar uma exceção, nenhuma saída ocorre.
  * Se o operador retornar true, tenta realizar a saída desejada inserindo os caracteres no stream de saída como se estivesse chamando rdbuf()->sputc(). Outros membros públicos de [std::basic_ostream](<#/doc/io/basic_ostream>) também podem ser usados, mas membros virtuais de rdbuf(), exceto [`overflow()`](<#/doc/io/basic_streambuf/overflow>), [`xsputn()`](<#/doc/io/basic_streambuf/sputn>) e [`sync()`](<#/doc/io/basic_streambuf/pubsync>), nunca serão chamados.

  * Se uma exceção for lançada durante a saída, define `badbit` no stream de saída. Se exceções em `badbit` estiverem habilitadas na [máscara de exceção](<#/doc/io/basic_ios/exceptions>) deste stream ((exceptions() & badbit) != 0), a exceção também é relançada.
  * Se nenhuma exceção foi lançada, retorna o valor especificado pela função.

3) Em qualquer caso, seja terminando por exceção ou retornando, o destrutor do sentry é chamado antes de sair desta função.

### Biblioteca padrão

As seguintes funções da standard library são **UnformattedOutputFunction s**.

  * [`basic_ostream::operator<<(basic_streambuf*)`](<#/doc/io/basic_ostream/operator_ltlt>)
  * [`basic_ostream::put`](<#/doc/io/basic_ostream/put>)
  * [`basic_ostream::write`](<#/doc/io/basic_ostream/write>)
  * [`basic_ostream::flush`](<#/doc/io/basic_ostream/flush>)

  * [`basic_ostream::tellp`](<#/doc/io/basic_ostream/tellp>) (exceto que chama pubseekoff em vez de saída)
  * [`basic_ostream::seekp`](<#/doc/io/basic_ostream/seekp>) (exceto que chama pubseekoff ou pubseekpos em vez de saída)

| (desde C++11)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 63](<https://cplusplus.github.io/LWG/issue63>) | C++98 | a política de tratamento de exceções estava faltando | adicionada
[LWG 160](<https://cplusplus.github.io/LWG/issue160>) | C++98 | o processo de determinar se a exceção capturada
é relançada mencionava uma função `exception()` não existente | corrigido para [`exceptions()`](<#/doc/io/basic_ios/exceptions>)
[LWG 165](<https://cplusplus.github.io/LWG/issue165>) | C++98 | o único membro virtual permitido ser
chamado em rdbuf() era `overflow()` | também permitidos
`xsputn()` e `sync()`
  *[_(as is)_]: A::pointer